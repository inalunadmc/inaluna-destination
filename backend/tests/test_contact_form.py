"""Backend tests for contact form fix verification.

Tests verify:
1. POST /api/contact returns 200 and persists to MongoDB even when Resend key is invalid
2. mice_data field is accepted
3. Invalid payloads return 422 (not 500)
4. GET /api/contact returns list including newly submitted
5. Logs contain the diagnostic message when Resend key is invalid
6. GET /api/ returns Hello World
"""
import os
import uuid
import time
import requests
import pytest

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://dmc-network-colombia.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---- Health check ----
def test_root_health(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    assert r.json() == {"message": "Hello World"}


# ---- Valid contact submission ----
def test_create_contact_valid_payload_returns_200(client):
    unique = f"TEST_{uuid.uuid4().hex[:8]}"
    payload = {
        "name": f"{unique} Tester",
        "company": "TEST Co",
        "email": f"{unique}@example.com",
        "destination": "Cartagena",
        "message": "Automated test submission (valid payload)."
    }
    r = client.post(f"{API}/contact", json=payload)
    assert r.status_code == 200, f"Expected 200, got {r.status_code}: {r.text}"
    data = r.json()
    assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
    assert "timestamp" in data
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert data["destination"] == payload["destination"]
    assert data["message"] == payload["message"]
    # save for downstream test
    pytest.saved_email = payload["email"]
    pytest.saved_id = data["id"]


def test_create_contact_with_mice_data(client):
    unique = f"TEST_{uuid.uuid4().hex[:8]}"
    payload = {
        "name": f"{unique} MICE",
        "company": "TEST MICE Co",
        "email": f"{unique}@example.com",
        "destination": "Bogotá",
        "message": "MICE inquiry with extended details.",
        "mice_data": {
            "event_type": "Corporate Retreat",
            "attendees": 50,
            "date_range": "2026-03-01 to 2026-03-05",
            "requirements": ["hotel", "transport", "activities"]
        }
    }
    r = client.post(f"{API}/contact", json=payload)
    assert r.status_code == 200, f"Expected 200, got {r.status_code}: {r.text}"
    data = r.json()
    # mice_data is not on response model (ContactForm) — that's OK
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert "id" in data


# ---- Invalid payload validation ----
def test_create_contact_missing_fields_returns_422(client):
    r = client.post(f"{API}/contact", json={"name": "OnlyName"})
    assert r.status_code == 422, f"Expected 422, got {r.status_code}: {r.text}"
    body = r.json()
    assert "detail" in body


def test_create_contact_invalid_email_returns_422(client):
    payload = {
        "name": "TEST Invalid",
        "company": "TEST",
        "email": "not-an-email",
        "destination": "X",
        "message": "bad email test"
    }
    r = client.post(f"{API}/contact", json=payload)
    assert r.status_code == 422, f"Expected 422, got {r.status_code}: {r.text}"


# ---- Persistence verification ----
def test_get_contacts_includes_recent_submission(client):
    # small delay to ensure write is visible
    time.sleep(0.5)
    r = client.get(f"{API}/contact")
    assert r.status_code == 200
    contacts = r.json()
    assert isinstance(contacts, list)
    saved_email = getattr(pytest, "saved_email", None)
    assert saved_email is not None, "Prior test must have set saved_email"
    emails = [c.get("email") for c in contacts]
    assert saved_email in emails, f"Submitted email {saved_email} not found in GET /api/contact"


# ---- Backend log diagnostic message verification ----
def test_backend_log_contains_invalid_key_message(client):
    """Trigger a submission then assert diagnostic log line is present.

    The current .env has an invalid Resend key so the endpoint should hit the
    Resend error path and emit the 'RESEND API KEY IS INVALID OR EXPIRED' log.
    """
    unique = f"TEST_{uuid.uuid4().hex[:8]}"
    payload = {
        "name": f"{unique} LogCheck",
        "company": "TEST",
        "email": f"{unique}@example.com",
        "destination": "Medellin",
        "message": "Trigger email failure for log check."
    }
    r = client.post(f"{API}/contact", json=payload)
    assert r.status_code == 200

    # Give logger a moment to flush
    time.sleep(1.0)

    log_paths = [
        "/var/log/supervisor/backend.err.log",
        "/var/log/supervisor/backend.out.log",
    ]
    combined = ""
    for p in log_paths:
        try:
            with open(p, "r") as fh:
                combined += fh.read()
        except FileNotFoundError:
            pass

    # Accept either the specific "INVALID OR EXPIRED" msg OR the placeholder-skip msg
    # (depending on whether the current key is placeholder-shaped or reaches Resend)
    assert (
        "RESEND API KEY IS INVALID OR EXPIRED" in combined
        or "RESEND_API_KEY is missing or placeholder" in combined
        or "Failed to send email via Resend" in combined
    ), (
        "Expected a Resend diagnostic message in backend logs but none was found. "
        "Log tail sample: " + combined[-2000:]
    )
