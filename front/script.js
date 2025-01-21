$(document).ready(function () {

    // Mostrar el formulario para crear usuario
    $('.crearUsuario').on('click', function () {
        $('#crearUsuarioForm').show();
    });

    // Mostrar el primer usuario
    $('.mostrarPrimero').on('click', function () {
        $.ajax({
            url: 'http://localhost:5000/api/usuarios', // URL del endpoint
            method: 'GET',
            success: function (usuarios) {
                if (usuarios.length > 0) {
                    const usuario = usuarios[0]; // Obtiene el primer usuario del arreglo
                    $('.usuarios').html(`
                        <div class="carta">
                            <h3>ID: ${usuario.id}</h3>
                            <p>Nombre: ${usuario.nombre}</p>
                            <p>Apellido: ${usuario.apellido}</p>
                        </div>
                    `);
                } else {
                    $('.usuarios').html('<p>No hay usuarios disponibles.</p>');
                }
            },
            error: function () {
                alert('Error al obtener los usuarios');
            }
        });
    });

    // Mostrar todos los usuarios
    $('.sacarTodos').on('click', function () {
        $.ajax({
            url: 'https://lanzarapi3.vercel.app/api/usuarios/',
            method: 'GET',
            success: function (usuarios) {
                $('.usuarios').html('');
                if (usuarios.length > 0) {
                    usuarios.forEach(usuario => {
                        $('.usuarios').append(`
                            <div class="carta">
                                <h3>ID: ${usuario.id}</h3>
                                <p><strong>Nombre:</strong> ${usuario.nombre}</p>
                                <p><strong>Apellido:</strong> ${usuario.apellido}</p>
                            </div>
                        `);
                    });
                } else {
                    $('.usuarios').html('<p>No hay usuarios disponibles.</p>');
                }
            },
            error: function () {
                alert('Error al obtener los usuarios');
            }
        });
    });

    // Crear un nuevo usuario
    $('#crearUsuarioForm').on('submit', function (e) {
        e.preventDefault();

        const nombre = $('#nombre').val();
        const apellido = $('#apellido').val();

        $.ajax({
            url: 'https://lanzarapi3.vercel.app/api/crear/',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ nombre, apellido }),
            success: function () {
                alert('Usuario creado correctamente');
                $('#crearUsuarioForm')[0].reset();
                $('#crearUsuarioForm').hide();
            },
            error: function () {
                alert('Error al crear el usuario');
            }
        });
    });

    // Buscar usuario por ID
    $('#buscarUsuarioForm').on('submit', function (e) {
        e.preventDefault();

        const userId = $('#usuarioId').val();

        $.ajax({
            url: `https://lanzarapi3.vercel.app/api/usuarios/${userId}`, // URL con el ID especificado
            method: 'GET',
            success: function (usuario) {
                if (usuario) {
                    $('.usuarios').html(`
                        <div class="carta">
                            <h3>ID: ${usuario.id}</h3>
                            <p>Nombre: ${usuario.nombre}</p>
                            <p>Apellido: ${usuario.apellido}</p>
                        </div>
                    `);
                } else {
                    $('.usuarios').html('<p>Usuario no encontrado.</p>');
                }
            },
            error: function () {
                $('.usuarios').html('<p>Error al buscar el usuario.</p>');
            }
        });
    });
});
