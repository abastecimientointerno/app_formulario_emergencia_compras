# Emergency Purchase App

Aplicación web desarrollada en **React** para gestionar solicitudes de compras de emergencia.

## Características
- **Formulario Principal**: Captura datos del solicitante (nombre, email, área, unidad operativa, planta/embarcación).
- **Artículos Dinámicos**: Permite añadir y eliminar artículos con validación de campos obligatorios.
- **Fecha Informativa**: Muestra la fecha actual sin interacción del usuario.
- **Diálogo de Confirmación**: Notifica el envío exitoso con el ID del ticket y una animación de un pez.
- **Integración con SharePoint**: Almacena solicitudes para gestión por compradores.
- **Notificación por Correo**: El usuario recibe un correo con los detalles de la solicitud.
- **Vista Kanban**: Los compradores gestionan tickets en SharePoint.
- **Animaciones**: Efectos suaves en la interfaz usando `framer-motion`.
- **Validación**: Campos obligatorios validados con `react-hook-form`.

## Tecnologías Utilizadas
- **React**: Frontend principal (versión 18).
- **Material-UI**: Componentes y estilos modernos.
- **Framer Motion**: Animaciones fluidas.
- **React Hook Form**: Manejo y validación de formularios.
- **Axios**: Peticiones HTTP al backend.
- **Power Automate**: Procesamiento y flujo de datos.
- **SharePoint**: Almacenamiento y gestión de tickets.

## Requisitos Previos
- Node.js (versión 16 o superior recomendada).
- npm (incluido con Node.js).

## Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/<tu-usuario>/emergency-purchase-app.git
   cd emergency-purchase-app