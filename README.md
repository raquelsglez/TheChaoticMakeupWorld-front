# The Chaotic Makeup World - Frontend

Este es un proyecto frontend de una **aplicación web** de un blog de maquillaje.

## Prerequisitsos
 - React (v18.3.1)
 - npm (v9.5.1)

 ## Tecnologías usadas
 - React
 - Html
 - Css


## Funcionamiento

### Environment Variables
Se necesita crear un archivo ``.env`` con las siguientes variables:
- ``VITE_BACKEND_HOST`` = Host del backend al que se desea atacar.

### Iniciar app
Para arrancar el proyecto es necesario ejecutar los siguientes comandos:

```
git clone https://github.com/raquelsglez/TheChaoticMakeupWorld-front.git
cd TheChaoticMakeupWorld-front
npm install
npm run dev
```

### Rutas
- Usuario:
    - No autenticado:
        - /register - Registro
        - /login - Login
        - / - Listado de posts con filtros
        - /post/:id - Detalle del post en el cual puedes hacer o deshacer favorito

    -  Autenticado:
        - /profile - Visualizar perfil del usuario 
        - /favorites - Lista los posts favoritos del usuario con filtros

- Administrador:
    -  Autenticado:
        - /admin/auth/login - Login
        - /admin/register - Registrar nuevo administrador
        - /admin - Listado de posts con filtros
        - /admin/post/:id - Detalle del post, desde aqui puedes editar o borrar el post
        - /admin/post/:id/edit - Página para editar un post
        - /admin/post/create - Página para crear un nuevo post

### Datos a tener en cuenta
- **Render**: Puede ser que al estar desplegado en render haya un poco más de latencia.
- **Responsive**: La web se ha hecho responsive para monitores de ordenador de más o menos 24 pulgadas y para pantallas de ordenadores portatiles de alrededor de 15 pulgadas.
- **Administrador**: No se puede acceder al administrador desde ningun lugar de la aplicación, se deberá acceder conociendo sus rutas pará que asi un usuario base no pueda acceder a este apartado. Se ha habilitado un administrador: 
    - **email:** profesor@gmail.com
    - **pasword:** profesor 
    - **ruta para acceder a la pantalla de administrador:** https://thechaoticmakeupworld-front-1.onrender.com/admin 

## Código
### Componentes
Los componentes están divididos en tres grandes grupos, **generales**, **usuario** y **administrador**, asi la logica de usuario y administrador está separada. Cada componente tiene su carpeta propia en la cual existe el codigo y su css.

- Generales
    - PostContext: Provider donde guardamos datos de toda la aplicación, posts, post, user, admin... Aqui además recuperamos el usuario o administrador desde localstorage por si recargamos la web que no se pierda su sesión.
    - App: Router donde damos de alta nuestras rutas.
- Usuario
    - Auth
        - Login: Lógica para hacer login, guardamos el usuario en el contexto y en localStorage. Desde aqui puedes acceder al register.
        - Register: Lógica de registro.
    - Post
        - PostCard: Componente en el cual se crean las tarjetas de los post para listarlas.
        - PostDetail: Muestra detalle del post además de tener la lógica de hacer o deshacer favorito.
        - PostFavorites: Listar posts favoritos y además permitir filtrar por un texto que incluya el titulo y ordenar por la fecha de creación de forma ascendente y descente.
        - PostList: Listar todos los posts y además permitir filtrar por un texto que incluya el titulo y ordenar por la fecha de creación de forma ascendente y descente.
    - Profile: Visualizar perfil del usuario, desde aqui puedes hacer logout y acceder a la lista de tus favoritos.
    - Root: Tiene la logica del header y el footer. Desde el header podemos acceder al perfil del usuario y a la pagina principal haciendo click en el titulo o en el icono de la casa. En el footer tenemos información de contacto con links de email y llamada.
    - PrivateRoute: Este componente se usa para indicar las rutas privadas en app, si intentas acceder a alguna de estas rutas sin estar logueado, el componente te redigirá al login. Actualmente se esta usando en las rutas de /profile y /favorites.

- Administrador
    - Auth
        - Login: Lógica para hacer login, guardamos el usuario en el contexto y en localStorage. Desde aqui puedes acceder de nuevo a la pagina principal del blog.
        - Register: Lógica de crear nuevo administrador.
    - Post
        - PostCard: Componente en el cual se crean las tarjetas de los post para listarlas.
        - PostCreate: Formulario de crear post.
        - PostDetail: Muestra detalle del post además de tener la logica de borrado y de abrir la página de editado.
        - PostEdit: Formulario de editado de producto.
        - PostList: Listar todos los posts y además permitir filtrar por un texto que incluya el titulo y ordenar por la fecha de creación de forma ascendente y descente.
    - Root: Tiene la logica del header. Desde el header podemos acceder a la crear post y administrador, además podemos volver a la pagina principal de la pagina del adminsitrador haciendo click en el titulo o en el icono de la casa. También podemos hacer logout.
    - PrivateRoute: Este componente se usa para indicar las rutas privadas en app, si intentas acceder a alguna de estas rutas sin estar logueado, el componente te redigirá al login. Se esta usando en todas las rutas.

## Visualización
- **Usuario**
    - Registro
    ![Página del registro](public/readmeImages/user/registro.png)

    - Login
    ![Página del login](public/readmeImages/user/login.png)

    - Perfil
    ![Página del perfil](public/readmeImages/user/perfil.png)

    - Principal (Listado de posts)
    ![Página del listado](public/readmeImages/user/listado.png)

    - Detalle no favorito
    ![Página del detalle no favorito](public/readmeImages/user/detalleNoFavorito.png)

    - Detalle favorito
    ![Página del detalle favorito](public/readmeImages/user/detalleFavorito.png)

    - Listado favoritos
    ![Listado de favoritos](public/readmeImages/user/listadoFavoritos.png)

- **Administrador**
    - Login
    ![Página del login](public/readmeImages/admin//login.png)

    - Crear Administrador
    ![Página de crear nuevo administrador](public/readmeImages/admin/crearAdministrador.png)

    - Crear Post
    ![Página de crear nuevo post](public/readmeImages/admin/crearPost.png)

    - Principal (Listado de posts)
    ![Página del listado](public/readmeImages/admin/listado.png)

    - Detalle
    ![Página del detalle](public/readmeImages/admin/detalle.png)

    - Confirmación Borrado
    ![Confirmación borrado](public/readmeImages/admin/confirmacionBorrado.png)

    - Editar
    ![Página de editar](public/readmeImages/admin/editar.png)
