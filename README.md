<<<<<<< HEAD
# ImportaPro
=======
# ImportaPro 🚀

**Aplicación Angular para gestión de productos de importación con cálculo de rentabilidad**

## 📋 Descripción

ImportaPro es una aplicación web desarrollada en Angular que permite gestionar productos de importación, calcular costos, impuestos, comisiones y determinar la rentabilidad de cada producto.

## ✨ Características

- 📝 **Formulario de productos**: Agregar y editar productos con todos sus datos
- 📊 **Tabla de productos**: Visualizar todos los productos con cálculos automáticos
- 📈 **Estadísticas en tiempo real**: Métricas de rentabilidad y análisis financiero
- 🧮 **Calculadora automática**: Cálculo de impuestos, comisiones y ganancias
- 🏷️ **Sistema de markup**: Calcular precios de venta con porcentaje de ganancia
- 🚪 **Régimen Puerta a Puerta**: Manejo especial de impuestos para envíos personales

## 🛠️ Tecnologías

- **Angular 20** - Framework principal
- **TypeScript** - Tipado estático
- **Angular Signals** - Estado reactivo
- **Angular Router** - Navegación SPA
- **Reactive Forms** - Formularios reactivos
- **SCSS** - Estilos avanzados

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/leonardobergallo/ImportaPro.git

# Entrar al directorio
cd ImportaPro

# Instalar dependencias
npm install
```

### Desarrollo
```bash
# Iniciar servidor de desarrollo
npm start

# Abrir en el navegador
# http://localhost:4200
```

### Build de producción
```bash
# Construir para producción
npm run build
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── product-form/          # Formulario de productos
│   ├── product-table/         # Tabla de productos
│   ├── stats/                 # Estadísticas
│   ├── contacto/              # Página de contacto
│   ├── product-calculator.ts  # Lógica de cálculo
│   ├── product-store.service.ts # Estado global
│   └── edit-product.service.ts # Servicio de edición
```

## 🎯 Funcionalidades Principales

### Gestión de Productos
- Agregar productos con precio AliExpress y envío
- Editar productos existentes
- Eliminar productos
- Cálculo automático de costos totales

### Cálculos Automáticos
- Conversión USD a ARS
- Impuestos (IVA, PAIS, AFIP, BBPP)
- Comisiones de MercadoLibre y MercadoPago
- Ganancia neta y rentabilidad

### Régimen Puerta a Puerta
- Manejo especial para envíos personales
- Límite de USD 50 sin impuestos
- 50% de impuesto sobre el excedente

## 🌐 Demo

**Aplicación en vivo**: [importa-pro.vercel.app](https://importa-pro.vercel.app)

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Autor

**Leonardo Bergallo**
- GitHub: [@leonardobergallo](https://github.com/leonardobergallo)
>>>>>>> adf1ae86b4da9f774882705fa5ff857db3395e55
