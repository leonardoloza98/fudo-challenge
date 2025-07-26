# Fudo Challenge

Una aplicación Next.js para gestionar posts y comentarios.

## 🛠 Tecnologías

- Next.js 15.4.4
- React 19.1.0
- TypeScript
- Tailwind CSS
- Docker

## 🚀 Inicio Rápido

### Desarrollo Local

1. Instalar dependencias:
```bash
yarn install
```

2. Crear archivo `.env.local`:
```bash
NEXT_PUBLIC_API_URL=https://665de6d7e88051d60408c32d.mockapi.io
```

3. Iniciar servidor de desarrollo:
```bash
yarn dev
```

La aplicación estará disponible en `http://localhost:3000`

### 🐳 Usando Docker

#### Construir la imagen
```bash
docker build -t fudo-challenge .
```

#### Ejecutar el contenedor
```bash
docker run -p 3000:3000 -d --name fudo-app fudo-challenge
```

La aplicación estará disponible en `http://localhost:3000`

#### Comandos Docker útiles

- **Detener el contenedor:**
  ```bash
  docker stop fudo-app
  ```

- **Iniciar el contenedor existente:**
  ```bash
  docker start fudo-app
  ```

- **Eliminar el contenedor:**
  ```bash
  docker rm fudo-app
  ```

- **Ver logs del contenedor:**
  ```bash
  docker logs fudo-app
  ```

- **Ejecutar con una API diferente:**
  ```bash
  docker run -p 3000:3000 -d --name fudo-app --env NEXT_PUBLIC_API_URL=https://otra-api.com fudo-challenge
  ```

## 📁 Estructura del Proyecto

```
src/
├── app/              # App router y rutas de la API
├── common/           # Constantes y utilidades compartidas
├── components/       # Componentes reutilizables
├── lib/             # Utilidades y configuraciones
└── modules/         # Módulos de la aplicación
    ├── login/       # Módulo de autenticación
    └── posts/       # Módulo de posts y comentarios
```

## 🧪 Tests

Para ejecutar los tests:
```bash
yarn test
```

## 🛠 Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `NEXT_PUBLIC_API_URL` | URL de la API | `https://665de6d7e88051d60408c32d.mockapi.io` |

## 📝 Características

- ✅ Autenticación con selección de avatar
- ✅ CRUD de posts
- ✅ Sistema de comentarios anidados
- ✅ Diseño responsive
- ✅ Tests unitarios
- ✅ Dockerización
