# Estructura de Componentes Angular - Tiphone v6

## 1. Estructura de Carpetas del Proyecto Angular

```mermaid
graph TD
    src[src/]
    src --> app[app/]
    src --> assets[assets/]
    src --> environments[environments/]

    app --> core[core/]
    app --> shared[shared/]
    app --> features[features/]
    app --> layout[layout/]
    app --> models[models/]
    app --> state[state/]

    core --> services_core[services/]
    core --> guards[guards/]
    core --> interceptors[interceptors/]
    core --> constants[constants/]

    shared --> components_shared[components/]
    shared --> directives[directives/]
    shared --> pipes[pipes/]
    shared --> validators[validators/]

    features --> campanas[campanas/]
    features --> operadores[operadores/]
    features --> grupos[grupos/]
    features --> chat[chat/]
    features --> ivr[ivr/]
    features --> supervision[supervision/]

    campanas --> campanas_components[components/]
    campanas --> campanas_services[services/]
    campanas --> campanas_models[models/]
    campanas --> campanas_store[store/]

    state --> actions[actions/]
    state --> reducers[reducers/]
    state --> effects[effects/]
    state --> selectors[selectors/]

    style src fill:#e1f5ff
    style app fill:#fff9c4
    style core fill:#ffcdd2
    style shared fill:#c8e6c9
    style features fill:#b39ddb
    style campanas fill:#f8bbd0
```

---

## 2. Módulo de Campañas - Árbol de Componentes

```mermaid
graph TB
    CampanasModule[CampanasModule]

    CampanasModule --> CampanasListComponent[CampanasListComponent<br/>Lista de campañas]
    CampanasModule --> CampanaDetailComponent[CampanaDetailComponent<br/>Detalle de campaña]
    CampanasModule --> CampanaFormComponent[CampanaFormComponent<br/>Formulario crear/editar]

    CampanaDetailComponent --> CampanaHeaderComponent[CampanaHeaderComponent<br/>Cabecera con acciones]
    CampanaDetailComponent --> CampanaTabsComponent[CampanaTabsComponent<br/>Pestañas de navegación]

    CampanaTabsComponent --> ListasTabComponent[ListasTabComponent<br/>Tab de listas]
    CampanaTabsComponent --> FiltrosTabComponent[FiltrosTabComponent<br/>Tab de filtros]
    CampanaTabsComponent --> ResultadosTabComponent[ResultadosTabComponent<br/>Tab de resultados]
    CampanaTabsComponent --> SupervisionTabComponent[SupervisionTabComponent<br/>Tab de supervisión]

    ListasTabComponent --> ListaItemComponent[ListaItemComponent<br/>Item de lista]
    ListaItemComponent --> OperadoresAsignadosComponent[OperadoresAsignadosComponent<br/>Operadores de la lista]

    FiltrosTabComponent --> FiltroFormComponent[FiltroFormComponent<br/>Crear/editar filtro]
    FiltrosTabComponent --> CondicionSelectorComponent[CondicionSelectorComponent<br/>Selector de condiciones]

    SupervisionTabComponent --> MetricasRealtimeComponent[MetricasRealtimeComponent<br/>Métricas en tiempo real]
    SupervisionTabComponent --> GraficosComponent[GraficosComponent<br/>Gráficos estadísticos]
    SupervisionTabComponent --> OperadoresActivosComponent[OperadoresActivosComponent<br/>Operadores activos]

    style CampanasModule fill:#b39ddb
    style CampanasListComponent fill:#e1f5ff
    style CampanaDetailComponent fill:#e1f5ff
    style SupervisionTabComponent fill:#ffcdd2
```

---

## 3. Módulo de Operadores - Componentes

```mermaid
graph TB
    OperadoresModule[OperadoresModule]

    OperadoresModule --> OperadoresListComponent[OperadoresListComponent<br/>Lista con DataTable]
    OperadoresModule --> OperadorDetailComponent[OperadorDetailComponent<br/>Detalle del operador]
    OperadoresModule --> OperadorFormComponent[OperadorFormComponent<br/>Formulario reactivo]

    OperadorDetailComponent --> OperadorInfoComponent[OperadorInfoComponent<br/>Información básica]
    OperadorDetailComponent --> OperadorGruposComponent[OperadorGruposComponent<br/>Grupos asignados]
    OperadorDetailComponent --> OperadorSkillsComponent[OperadorSkillsComponent<br/>Skills del operador]
    OperadorDetailComponent --> OperadorListasComponent[OperadorListasComponent<br/>Listas asignadas]
    OperadorDetailComponent --> OperadorPermisosComponent[OperadorPermisosComponent<br/>Permisos]

    OperadorGruposComponent --> AsignarGrupoModalComponent[AsignarGrupoModalComponent<br/>Modal para asignar]
    OperadorSkillsComponent --> AsignarSkillModalComponent[AsignarSkillModalComponent<br/>Modal con prioridad]

    OperadorFormComponent --> PasswordFieldComponent[PasswordFieldComponent<br/>Campo contraseña]
    OperadorFormComponent --> RolSelectorComponent[RolSelectorComponent<br/>Selector de rol]

    style OperadoresModule fill:#b39ddb
    style OperadoresListComponent fill:#e1f5ff
    style OperadorDetailComponent fill:#fff9c4
```

---

## 4. Componentes Compartidos (Shared)

```mermaid
graph TB
    SharedModule[SharedModule]

    SharedModule --> DataTableComponent[DataTableComponent<br/>Tabla reutilizable]
    SharedModule --> ModalComponent[ModalComponent<br/>Modal genérico]
    SharedModule --> LoadingSpinnerComponent[LoadingSpinnerComponent<br/>Spinner de carga]
    SharedModule --> ConfirmDialogComponent[ConfirmDialogComponent<br/>Diálogo confirmación]
    SharedModule --> ToastComponent[ToastComponent<br/>Notificaciones]
    SharedModule --> BreadcrumbComponent[BreadcrumbComponent<br/>Navegación]
    SharedModule --> SearchBoxComponent[SearchBoxComponent<br/>Buscador]
    SharedModule --> PaginatorComponent[PaginatorComponent<br/>Paginación]
    SharedModule --> FormFieldComponent[FormFieldComponent<br/>Campo de formulario]
    SharedModule --> DatePickerComponent[DatePickerComponent<br/>Selector de fecha]
    SharedModule --> TimePickerComponent[TimePickerComponent<br/>Selector de hora]
    SharedModule --> FileUploadComponent[FileUploadComponent<br/>Subir archivos]
    SharedModule --> BadgeComponent[BadgeComponent<br/>Insignias]
    SharedModule --> ChartComponent[ChartComponent<br/>Gráficos Chart.js]

    DataTableComponent --> ColumnFilterComponent[ColumnFilterComponent<br/>Filtro de columna]
    DataTableComponent --> ExportButtonComponent[ExportButtonComponent<br/>Exportar datos]

    style SharedModule fill:#c8e6c9
    style DataTableComponent fill:#e1f5ff
```

---

## 5. Layout y Navegación

```mermaid
graph TB
    AppComponent[AppComponent<br/>Componente raíz]

    AppComponent --> LayoutComponent[LayoutComponent<br/>Layout principal]

    LayoutComponent --> HeaderComponent[HeaderComponent<br/>Cabecera]
    LayoutComponent --> SidebarComponent[SidebarComponent<br/>Menú lateral]
    LayoutComponent --> ContentComponent[ContentComponent<br/>Contenido principal]
    LayoutComponent --> FooterComponent[FooterComponent<br/>Pie de página]

    HeaderComponent --> UserMenuComponent[UserMenuComponent<br/>Menú de usuario]
    HeaderComponent --> NotificationsComponent[NotificationsComponent<br/>Notificaciones]
    HeaderComponent --> LanguageSelectorComponent[LanguageSelectorComponent<br/>Selector de idioma]

    SidebarComponent --> MenuItemComponent[MenuItemComponent<br/>Item de menú]
    SidebarComponent --> SubMenuComponent[SubMenuComponent<br/>Submenú]

    MenuItemComponent --> MenuIconComponent[MenuIconComponent<br/>Icono del menú]

    ContentComponent --> RouterOutlet[router-outlet<br/>Contenido dinámico]

    style AppComponent fill:#ffcdd2
    style LayoutComponent fill:#fff9c4
    style HeaderComponent fill:#e1f5ff
    style SidebarComponent fill:#e1f5ff
```

---

## 6. Estado Global (NgRx Store)

```mermaid
graph LR
    Component[Component]
    Store[NgRx Store]
    Actions[Actions]
    Effects[Effects]
    Reducers[Reducers]
    Selectors[Selectors]
    Service[Service API]

    Component -->|dispatch| Actions
    Actions -->|trigger| Effects
    Effects -->|call| Service
    Service -->|return data| Effects
    Effects -->|dispatch success| Actions
    Actions -->|update| Reducers
    Reducers -->|new state| Store
    Store -->|select| Selectors
    Selectors -->|observable| Component

    style Component fill:#e1f5ff
    style Store fill:#ffcdd2
    style Effects fill:#fff9c4
    style Service fill:#c8e6c9
```

---

## 7. Flujo de Datos - Smart & Presentational Components

```mermaid
graph TB
    subgraph "Smart Components (Container)"
        CampanasListContainer[CampanasListContainer<br/>Gestiona estado y lógica]
    end

    subgraph "Services"
        CampanaService[CampanaService]
        Store[Store]
    end

    subgraph "Presentational Components"
        CampanasListView[CampanasListView<br/>Solo presentación]
        CampanaCardComponent[CampanaCardComponent<br/>Card individual]
        CampanaFiltersComponent[CampanaFiltersComponent<br/>Filtros]
    end

    CampanasListContainer -->|subscribe| Store
    CampanasListContainer -->|call| CampanaService
    Store -->|state$| CampanasListContainer
    CampanaService -->|data| CampanasListContainer

    CampanasListContainer -->|@Input campanas| CampanasListView
    CampanasListView -->|@Output onSelect| CampanasListContainer

    CampanasListView -->|*ngFor| CampanaCardComponent
    CampanaCardComponent -->|@Output onClick| CampanasListView

    CampanasListContainer -->|@Input| CampanaFiltersComponent
    CampanaFiltersComponent -->|@Output onFilter| CampanasListContainer

    style CampanasListContainer fill:#ffcdd2
    style CampanasListView fill:#e1f5ff
    style Store fill:#fff9c4
```

---

## 8. Servicios por Capa

```mermaid
graph TB
    subgraph "Feature Services"
        CampanaService[CampanaService]
        OperadorService[OperadorService]
        GrupoService[GrupoService]
        ChatService[ChatService]
    end

    subgraph "Core Services"
        HttpService[HttpService<br/>Wrapper de HttpClient]
        AuthService[AuthService<br/>Autenticación]
        WebSocketService[WebSocketService<br/>SignalR]
        StorageService[StorageService<br/>LocalStorage]
        ErrorHandlerService[ErrorHandlerService]
        LoggerService[LoggerService]
    end

    subgraph "Infrastructure"
        HttpClient[HttpClient]
        LocalStorage[LocalStorage]
        SignalR[SignalR Client]
    end

    CampanaService --> HttpService
    OperadorService --> HttpService
    GrupoService --> HttpService
    ChatService --> WebSocketService

    HttpService --> HttpClient
    HttpService --> AuthService
    HttpService --> ErrorHandlerService

    AuthService --> StorageService
    StorageService --> LocalStorage

    WebSocketService --> SignalR
    WebSocketService --> AuthService

    style CampanaService fill:#b39ddb
    style HttpService fill:#ffcdd2
    style HttpClient fill:#c8e6c9
```

---

## 9. Guards y Rutas

```mermaid
graph TB
    Router[Angular Router]

    Router --> AuthGuard[AuthGuard<br/>Verificar autenticación]
    Router --> RoleGuard[RoleGuard<br/>Verificar permisos]
    Router --> CanDeactivateGuard[CanDeactivateGuard<br/>Cambios no guardados]

    AuthGuard -->|authenticated| Component
    AuthGuard -->|not authenticated| LoginPage[Login Page]

    RoleGuard -->|has permission| Component
    RoleGuard -->|no permission| UnauthorizedPage[403 Page]

    CanDeactivateGuard -->|no changes| NextRoute[Next Route]
    CanDeactivateGuard -->|has changes| ConfirmDialog[Confirm Dialog]

    ConfirmDialog -->|confirm| NextRoute
    ConfirmDialog -->|cancel| StaySamePage[Stay Same Page]

    Component[Protected Component]

    style AuthGuard fill:#ffcdd2
    style RoleGuard fill:#fff9c4
    style Component fill:#e1f5ff
```

---

## 10. Interceptores HTTP

```mermaid
graph LR
    Component[Component]
    Service[Service]
    HttpClient[HttpClient]

    Interceptor1[AuthInterceptor<br/>Add JWT Token]
    Interceptor2[LoadingInterceptor<br/>Show/Hide Spinner]
    Interceptor3[ErrorInterceptor<br/>Handle Errors]
    Interceptor4[CacheInterceptor<br/>Cache Responses]

    API[Backend API]

    Component --> Service
    Service --> HttpClient
    HttpClient --> Interceptor1
    Interceptor1 --> Interceptor2
    Interceptor2 --> Interceptor3
    Interceptor3 --> Interceptor4
    Interceptor4 --> API

    API -->|response| Interceptor4
    Interceptor4 -->|response| Interceptor3
    Interceptor3 -->|response| Interceptor2
    Interceptor2 -->|response| Interceptor1
    Interceptor1 -->|response| HttpClient
    HttpClient -->|data| Service
    Service -->|data| Component

    style Component fill:#e1f5ff
    style Interceptor1 fill:#ffcdd2
    style Interceptor2 fill:#fff9c4
    style Interceptor3 fill:#c8e6c9
    style API fill:#b39ddb
```

---

## 11. Módulo de Chat - Componentes en Tiempo Real

```mermaid
graph TB
    ChatModule[ChatModule]

    ChatModule --> ChatListComponent[ChatListComponent<br/>Lista de chats activos]
    ChatModule --> ChatWindowComponent[ChatWindowComponent<br/>Ventana de conversación]
    ChatModule --> ChatQueueComponent[ChatQueueComponent<br/>Cola de espera]

    ChatWindowComponent --> ChatHeaderComponent[ChatHeaderComponent<br/>Info del cliente]
    ChatWindowComponent --> ChatMessagesComponent[ChatMessagesComponent<br/>Mensajes]
    ChatWindowComponent --> ChatInputComponent[ChatInputComponent<br/>Input de mensaje]
    ChatWindowComponent --> ChatActionsComponent[ChatActionsComponent<br/>Acciones: transferir, etc]

    ChatMessagesComponent --> MessageComponent[MessageComponent<br/>Mensaje individual]

    MessageComponent --> MessageClientComponent[MessageClientComponent<br/>Mensaje del cliente]
    MessageComponent --> MessageOperadorComponent[MessageOperadorComponent<br/>Mensaje del operador]
    MessageComponent --> MessageSystemComponent[MessageSystemComponent<br/>Mensaje del sistema]

    ChatInputComponent --> EmojiPickerComponent[EmojiPickerComponent<br/>Selector de emojis]
    ChatInputComponent --> FileAttachComponent[FileAttachComponent<br/>Adjuntar archivo]

    ChatActionsComponent --> TransferChatModalComponent[TransferChatModalComponent<br/>Modal transferir]
    ChatActionsComponent --> FinalizeChatModalComponent[FinalizeChatModalComponent<br/>Modal finalizar]

    style ChatModule fill:#b39ddb
    style ChatWindowComponent fill:#e1f5ff
    style ChatMessagesComponent fill:#fff9c4
```

---

## 12. Directivas Personalizadas

```mermaid
graph TB
    Directives[Directivas Custom]

    Directives --> PermissionDirective[PermissionDirective<br/>*appHasPermission]
    Directives --> LoadingDirective[LoadingDirective<br/>appLoading]
    Directives --> HighlightDirective[HighlightDirective<br/>appHighlight]
    Directives --> DebounceClickDirective[DebounceClickDirective<br/>appDebounceClick]
    Directives --> AutofocusDirective[AutofocusDirective<br/>appAutofocus]
    Directives --> OnlyNumbersDirective[OnlyNumbersDirective<br/>appOnlyNumbers]

    PermissionDirective -.uso.-> Component1[Cualquier componente]
    LoadingDirective -.uso.-> Component2[Botones, forms]
    HighlightDirective -.uso.-> Component3[Tablas, listas]

    style Directives fill:#c8e6c9
    style PermissionDirective fill:#e1f5ff
```

---

## 13. Pipes Personalizados

```mermaid
graph TB
    Pipes[Pipes Custom]

    Pipes --> SafeHtmlPipe[SafeHtmlPipe<br/>Sanitizar HTML]
    Pipes --> PhoneFormatPipe[PhoneFormatPipe<br/>Formatear teléfono]
    Pipes --> DurationPipe[DurationPipe<br/>Formatear duración]
    Pipes --> TimeAgoPipe[TimeAgoPipe<br/>Tiempo relativo]
    Pipes --> TruncatePipe[TruncatePipe<br/>Truncar texto]
    Pipes --> FilterPipe[FilterPipe<br/>Filtrar arrays]

    Component[Component Template] -.usa.-> SafeHtmlPipe
    Component -.usa.-> PhoneFormatPipe
    Component -.usa.-> DurationPipe

    style Pipes fill:#c8e6c9
    style SafeHtmlPipe fill:#e1f5ff
```

---

## 14. Validadores Personalizados

```mermaid
graph TB
    Validators[Validadores Custom]

    Validators --> PhoneValidator[PhoneValidator<br/>Validar teléfono]
    Validators --> EmailValidator[EmailValidator<br/>Validar email]
    Validators --> PasswordValidator[PasswordValidator<br/>Validar contraseña]
    Validators --> DateRangeValidator[DateRangeValidator<br/>Validar rango fechas]
    Validators --> UniqueValidator[UniqueValidator<br/>Validar único en DB]

    FormComponent[Reactive Forms] -.aplica.-> PhoneValidator
    FormComponent -.aplica.-> PasswordValidator

    style Validators fill:#c8e6c9
    style PhoneValidator fill:#e1f5ff
```

---

## Convenciones de Nomenclatura

### Componentes
- **Smart Components**: `*Container` o `*Page`
- **Presentational**: `*Component` o `*View`
- **Modal/Dialog**: `*ModalComponent` o `*DialogComponent`

### Servicios
- **Feature Services**: `*Service` (ej: `CampanaService`)
- **Core Services**: `*Service` (ej: `AuthService`)

### Store
- **Actions**: `[Feature] Action Name`
- **Reducers**: `*Reducer`
- **Effects**: `*Effects`
- **Selectors**: `select*`

### Archivos
- **Component**: `*.component.ts`, `*.component.html`, `*.component.scss`
- **Service**: `*.service.ts`
- **Model**: `*.model.ts` o `*.interface.ts`
- **Guard**: `*.guard.ts`
- **Interceptor**: `*.interceptor.ts`
