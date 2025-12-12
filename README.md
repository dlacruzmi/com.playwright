
# 🚀 Reto de Automatización QA – FrontEnd (Sauce Demo)

Pruebas automatizadas end-to-end para la aplicación **Sauce Demo** utilizando **Playwright**, **Cucumber (BDD)** y el patrón de diseño **Page Object Model (POM)**.  
Este proyecto forma parte del reto técnico descrito en el documento *Reto de Automatización QA – FrontEnd*.

---

## 📌 Tecnologías Utilizadas

| Tecnología | Descripción |
|-----------|-------------|
| **Playwright** | Framework de automatización para pruebas E2E. |
| **Cucumber.js** | Define escenarios en Gherkin siguiendo BDD. |
| **JavaScript (ESM)** | Sintaxis moderna para módulos. |
| **Page Object Model (POM)** | Mejora mantenibilidad y escalabilidad. |
| **HTML Report** | Reporte visual con evidencias. |

---

## 🧱 Arquitectura del Proyecto

```
sauce-demo-project/
│── tests/
│   ├── features/        # Escenarios en Gherkin
│   ├── steps/           # Step Definitions
│   ├── pages/           # Page Objects (POM)
│   └── support/         # Hooks, World y flujos comunes
│
│── reports/             # JSON + HTML + screenshots
│── cucumber.mjs         # Configuración de Cucumber
│── generate-report.js   # Generador de reporte HTML
│── package.json
│── README.md
```

---

## 🧩 Page Object Model (POM)

El proyecto implementa **POM**, lo que garantiza:

- Selectores encapsulados.  
- Métodos reutilizables por página.  
- Tests más limpios y fáciles de mantener.

Ejemplo:

```js
await loginPage.login("standard_user", "secret_sauce");
await productsPage.addFirstProductToCart();
```

---

## ▶️ Ejecución de Pruebas

### 1️⃣ Instalar dependencias

```bash
npm install
npx playwright install
```

### 2️⃣ Ejecutar TODA la suite

```bash
npm test
```

---

# 🏷️ Ejecución por Tags

Ejemplos:

### Solo smoke tests

```bash
npm test -- --tags @smoke
```

### Solo login

```bash
npm test -- --tags @login
```


---

# 📊 Reporte Web con Evidencias

Generar reporte:

```bash
npm run report
```

Este comando:

1. Limpia reportes anteriores  
2. Ejecuta todas las pruebas  
3. Genera `report.html`  
4. Abre el reporte automáticamente  

El resultado se encuentra en:

```
reports/html/report.html
```

---

# 📚 Estrategia de Automatización

- Uso del patrón **Page Object Model (POM)** para mejorar escalabilidad.  
- Escenarios definidos en **Gherkin** siguiendo buenas prácticas BDD.  
- Manejo de múltiples tipos de usuarios (`standard_user`, `locked_out_user`).  
- Clasificación por **tags** (`@smoke`, `@regression`, `@login`, etc.).  
- Generación de screenshots **por cada paso**.  
- Reporte HTML final para análisis visual.

---

