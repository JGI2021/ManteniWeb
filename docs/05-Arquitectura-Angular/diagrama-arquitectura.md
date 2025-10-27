# Diagramas de Arquitectura - Tiphone v6

## 1. Arquitectura Actual (ASP.NET Web Forms)

```mermaid
graph TB
    subgraph "Cliente"
        Browser[Navegador<br/>Internet Explorer]
    end

    subgraph "Servidor Web - IIS"
        ASPX[Páginas ASPX<br/>155 páginas]
        CodeBehind[Code-Behind<br/>Compilado en DLLs]
        ViewState[ViewState<br/>Gestión de Estado]
        WebServices[Web Services<br/>*.asmx]

        ASPX -->|Postback| CodeBehind
        CodeBehind -->|Gestiona| ViewState
        Browser -->|HTTP POST| ASPX
    end

    subgraph "Capa de Negocio"
        BLL[Business Logic Layer<br/>DLLs Compiladas]
        Validaciones[Validaciones]
        RegrasNegocio[Reglas de Negocio]

        CodeBehind --> BLL
        BLL --> Validaciones
        BLL --> RegrasNegocio
    end

    subgraph "Capa de Datos"
        DAL[Data Access Layer<br/>Entity Framework 6]
        Conexiones[Gestión de Conexiones<br/>OLEDB]

        BLL --> DAL
        DAL --> Conexiones
    end

    subgraph "Bases de Datos"
        SQLGEN[(CC_GENERAL)]
        SQLTIPH[(CC_TIPHONE)]
        SQLIVR[(CC_IVR)]
        SQLEST[(CC_ESTADISTICAS)]

        Conexiones --> SQLGEN
        Conexiones --> SQLTIPH
        Conexiones --> SQLIVR
        Conexiones --> SQLEST
    end

    subgraph "Integraciones Externas"
        Persuader[Persuader API<br/>Motor de Campañas]
        Asterisk[Asterisk<br/>Sistema VoIP]
        ChatServer[Chat Server]
        SecurityCenter[Security Center<br/>OAuth]
        RecordingsAPI[Recordings API<br/>Grabaciones]

        BLL --> Persuader
        BLL --> Asterisk
        BLL --> ChatServer
        BLL --> SecurityCenter
        BLL --> RecordingsAPI
    end

    style Browser fill:#e1f5ff
    style ASPX fill:#ffcdd2
    style BLL fill:#fff9c4
    style DAL fill:#c8e6c9
    style SQLGEN fill:#b39ddb
    style SQLTIPH fill:#b39ddb
    style SQLIVR fill:#b39ddb
    style SQLEST fill:#b39ddb
```

---

## 2. Arquitectura Propuesta (Angular + .NET Core)

```mermaid
graph TB
    subgraph "Cliente - SPA"
        Browser[Navegador Moderno<br/>Chrome, Edge, Firefox]

        subgraph "Angular 17+"
            Components[Components<br/>Smart & Presentational]
            Services[Services<br/>HTTP Clients]
            Store[State Management<br/>NgRx/Signals]
            Guards[Guards & Interceptors]

            Components --> Services
            Components --> Store
            Services --> Guards
        end

        Browser --> Components
    end

    subgraph "Backend - .NET 8 Web API"
        subgraph "API Layer"
            Controllers[Controllers<br/>REST Endpoints]
            Middleware[Middleware<br/>Auth, Logging, Errors]

            Controllers --> Middleware
        end

        subgraph "Application Layer"
            UseCases[Use Cases<br/>Application Services]
            DTOs[DTOs<br/>Request/Response Models]
            Validators[Validators<br/>FluentValidation]
            Mappers[Mappers<br/>AutoMapper]

            Controllers --> UseCases
            UseCases --> DTOs
            UseCases --> Validators
            UseCases --> Mappers
        end

        subgraph "Domain Layer"
            Entities[Entities<br/>Domain Models]
            Interfaces[Interfaces<br/>Repositories]
            DomainServices[Domain Services<br/>Business Logic]

            UseCases --> Interfaces
            UseCases --> DomainServices
            DomainServices --> Entities
        end

        subgraph "Infrastructure Layer"
            Repositories[Repositories<br/>Data Access]
            EFCore[Entity Framework Core 8]
            DbContext[DbContext]
            Cache[Cache<br/>Redis/Memory]

            Interfaces -.implements.- Repositories
            Repositories --> EFCore
            EFCore --> DbContext
            Repositories --> Cache
        end
    end

    subgraph "Base de Datos"
        PostgreSQL[(PostgreSQL<br/>o SQL Server)]

        DbContext --> PostgreSQL
    end

    subgraph "Infraestructura Cloud"
        Redis[(Redis<br/>Caché & Sesiones)]
        AppInsights[Application Insights<br/>Monitoring]
        KeyVault[Key Vault<br/>Secrets]
        BlobStorage[Blob Storage<br/>Archivos]

        Cache --> Redis
        Controllers --> AppInsights
        Middleware --> KeyVault
        Repositories --> BlobStorage
    end

    subgraph "APIs Externas"
        PersuaderAPI[Persuader API]
        AsteriskAPI[Asterisk API]
        ChatAPI[Chat Server API]
        RecordingsAPI[Recordings API]

        DomainServices --> PersuaderAPI
        DomainServices --> AsteriskAPI
        DomainServices --> ChatAPI
        DomainServices --> RecordingsAPI
    end

    Services -->|HTTPS/JSON| Controllers

    style Components fill:#e1f5ff
    style Controllers fill:#ffcdd2
    style UseCases fill:#fff9c4
    style DomainServices fill:#ffe0b2
    style Repositories fill:#c8e6c9
    style PostgreSQL fill:#b39ddb
    style Redis fill:#f8bbd0
```

---

## 3. Comparación Arquitectónica

```mermaid
graph LR
    subgraph "Web Forms (Actual)"
        A1[Monolítico]
        A2[Acoplado]
        A3[ViewState]
        A4[Postback]
        A5[No Escalable]
    end

    subgraph "Angular + .NET (Propuesta)"
        B1[Desacoplado]
        B2[API REST]
        B3[Stateless]
        B4[SPA]
        B5[Escalable]
    end

    A1 -.migra a.- B1
    A2 -.migra a.- B2
    A3 -.migra a.- B3
    A4 -.migra a.- B4
    A5 -.migra a.- B5

    style A1 fill:#ffcdd2
    style A2 fill:#ffcdd2
    style A3 fill:#ffcdd2
    style A4 fill:#ffcdd2
    style A5 fill:#ffcdd2

    style B1 fill:#c8e6c9
    style B2 fill:#c8e6c9
    style B3 fill:#c8e6c9
    style B4 fill:#c8e6c9
    style B5 fill:#c8e6c9
```

---

## 4. Flujo de Petición - Arquitectura Propuesta

```mermaid
sequenceDiagram
    participant User as Usuario
    participant Angular as Angular App
    participant Guard as Auth Guard
    participant Service as HTTP Service
    participant API as API Controller
    participant UseCase as Use Case
    participant Domain as Domain Service
    participant Repo as Repository
    participant DB as Base de Datos
    participant Cache as Redis Cache

    User->>Angular: Interacción UI
    Angular->>Guard: Verificar Auth
    Guard->>Service: Token válido
    Service->>API: HTTP Request + JWT
    API->>API: Validar JWT
    API->>UseCase: Ejecutar caso de uso
    UseCase->>Domain: Lógica de negocio
    Domain->>Repo: Consultar datos

    alt Datos en caché
        Repo->>Cache: Buscar en caché
        Cache-->>Repo: Datos encontrados
    else Datos no en caché
        Repo->>DB: Query SQL
        DB-->>Repo: Resultados
        Repo->>Cache: Guardar en caché
    end

    Repo-->>Domain: Entidades
    Domain-->>UseCase: Resultado procesado
    UseCase->>UseCase: Mapear a DTO
    UseCase-->>API: DTO Response
    API-->>Service: JSON Response
    Service-->>Angular: Actualizar estado
    Angular-->>User: Renderizar UI
```

---

## 5. Arquitectura de Despliegue

```mermaid
graph TB
    subgraph "Frontend - CDN/Static Hosting"
        CDN[Azure CDN<br/>Archivos estáticos]
        Angular[Angular Build<br/>Optimizado]

        CDN --> Angular
    end

    subgraph "Backend - App Service / Kubernetes"
        LB[Load Balancer]
        API1[API Instance 1]
        API2[API Instance 2]
        API3[API Instance N]

        LB --> API1
        LB --> API2
        LB --> API3
    end

    subgraph "Datos y Caché"
        Redis[(Redis Cluster)]
        DB[(PostgreSQL<br/>Primary)]
        DBReplica[(PostgreSQL<br/>Replica)]

        DB --> DBReplica
    end

    subgraph "Servicios Compartidos"
        KeyVault[Azure Key Vault]
        AppInsights[App Insights]
        BlobStorage[Blob Storage]
    end

    Angular -->|HTTPS| LB
    API1 --> Redis
    API2 --> Redis
    API3 --> Redis

    API1 --> DB
    API2 --> DB
    API3 --> DB

    API1 --> KeyVault
    API1 --> AppInsights
    API1 --> BlobStorage

    style CDN fill:#e1f5ff
    style LB fill:#ffcdd2
    style DB fill:#b39ddb
    style Redis fill:#f8bbd0
```

---

## 6. Seguridad y Autenticación

```mermaid
graph TB
    subgraph "Cliente"
        User[Usuario]
        AngularApp[Angular App]
    end

    subgraph "Autenticación"
        Login[Login Component]
        AuthService[Auth Service]
        TokenStorage[Token Storage<br/>LocalStorage]

        User --> Login
        Login --> AuthService
        AuthService --> TokenStorage
    end

    subgraph "Backend API"
        AuthController[Auth Controller]
        JWTMiddleware[JWT Middleware]
        UserService[User Service]

        AuthService -->|POST /auth/login| AuthController
        AuthController --> UserService
        AuthController -->|JWT Token| AuthService
    end

    subgraph "Autorización"
        AuthGuard[Auth Guard]
        RoleGuard[Role Guard]
        Interceptor[HTTP Interceptor]

        AngularApp --> AuthGuard
        AuthGuard --> RoleGuard
        RoleGuard --> Interceptor
        Interceptor -->|Add JWT Header| JWTMiddleware
    end

    subgraph "Base de Datos"
        UsersDB[(Usuarios<br/>Roles<br/>Permisos)]

        UserService --> UsersDB
    end

    style Login fill:#e1f5ff
    style AuthController fill:#ffcdd2
    style JWTMiddleware fill:#fff9c4
    style UsersDB fill:#b39ddb
```

---

## 7. Estrategia de Migración - Strangler Pattern

```mermaid
graph TB
    subgraph "Fase 0 - Actual"
        OldApp[Aplicación ASP.NET<br/>Web Forms]
    end

    subgraph "Fase 1 - Proxy + Auth"
        Proxy1[API Gateway/Proxy]
        NewAuth[Nuevo Sistema Auth<br/>Angular + .NET]
        OldApp1[App Web Forms<br/>Con Auth nuevo]

        Proxy1 --> NewAuth
        Proxy1 --> OldApp1
    end

    subgraph "Fase 2 - Módulos Core"
        Proxy2[API Gateway]
        NewModules1[Operadores<br/>Grupos<br/>Angular]
        OldApp2[Resto Módulos<br/>Web Forms]

        Proxy2 --> NewModules1
        Proxy2 --> OldApp2
    end

    subgraph "Fase 3 - Módulos Principales"
        Proxy3[API Gateway]
        NewModules2[Campañas<br/>Listas<br/>Angular]
        NewModules3[Operadores<br/>Grupos<br/>Angular]
        OldApp3[Resto Módulos<br/>Web Forms]

        Proxy3 --> NewModules2
        Proxy3 --> NewModules3
        Proxy3 --> OldApp3
    end

    subgraph "Fase 4 - Finalización"
        Proxy4[API Gateway]
        FullNewApp[Aplicación Completa<br/>Angular + .NET]

        Proxy4 --> FullNewApp
    end

    OldApp -.Fase 1.- Proxy1
    Proxy1 -.Fase 2.- Proxy2
    Proxy2 -.Fase 3.- Proxy3
    Proxy3 -.Fase 4.- Proxy4

    style OldApp fill:#ffcdd2
    style NewAuth fill:#c8e6c9
    style NewModules1 fill:#c8e6c9
    style NewModules2 fill:#c8e6c9
    style NewModules3 fill:#c8e6c9
    style FullNewApp fill:#a5d6a7
```

---

**Leyenda de Colores**:
- 🔵 Azul: Frontend/Cliente
- 🔴 Rojo: API/Controllers
- 🟡 Amarillo: Application Layer
- 🟠 Naranja: Domain Layer
- 🟢 Verde: Infrastructure/Data
- 🟣 Púrpura: Base de Datos
- 🌸 Rosa: Caché/Redis
