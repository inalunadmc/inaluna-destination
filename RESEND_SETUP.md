# Configuración de Resend para Inaluna Destination

## ¿Qué es Resend?
Resend es un servicio de email transaccional que permite enviar correos electrónicos profesionales desde tu aplicación de forma confiable y con alta tasa de entrega.

## Configuración

### 1. Crear cuenta en Resend
1. Visita https://resend.com
2. Crea una cuenta gratuita
3. Verifica tu email

### 2. Obtener API Key
1. Una vez en el dashboard de Resend, ve a "API Keys"
2. Haz clic en "Create API Key"
3. Dale un nombre (ej: "Inaluna Production")
4. Copia la API Key (empieza con `re_...`)

### 3. Configurar en tu aplicación
1. Abre el archivo `/app/backend/.env`
2. Reemplaza la línea:
   ```
   RESEND_API_KEY=re_123456789
   ```
   Con tu API Key real:
   ```
   RESEND_API_KEY=re_tu_api_key_aqui
   ```

3. Actualiza el email de destino si es necesario:
   ```
   RECIPIENT_EMAIL=info@inalunadmc.com
   ```

### 4. Reiniciar el backend
```bash
sudo supervisorctl restart backend
```

## Verificación del dominio (Recomendado para producción)

Para mejorar la entregabilidad y usar tu propio dominio (@inalunadmc.com):

1. En Resend dashboard, ve a "Domains"
2. Haz clic en "Add Domain"
3. Ingresa tu dominio: `inalunadmc.com`
4. Sigue las instrucciones para agregar registros DNS
5. Una vez verificado, actualiza en `/app/backend/.env`:
   ```
   SENDER_EMAIL=notifications@inalunadmc.com
   ```

## Plan Gratuito de Resend
- 3,000 emails/mes
- 100 emails/día
- Perfecto para comenzar

## Funcionalidad implementada

Cuando un usuario llena el formulario de contacto en tu sitio web:
1. Los datos se guardan en MongoDB
2. Se envía automáticamente un email a `info@inalunadmc.com` con:
   - Nombre del contacto
   - Empresa
   - Email
   - Destino de interés
   - Mensaje completo
   - Formato elegante con los colores de tu marca

## Testing

Para probar sin API Key real:
- El formulario seguirá funcionando y guardando datos en MongoDB
- Solo no se enviarán los emails automáticos
- Los logs mostrarán el intento de envío

## Soporte
Si tienes problemas, contacta a soporte de Resend: support@resend.com
