const usuarios = [
  { id: 1, nombre: "Juan Pérez",       correo: "juan.perez@example.com"       },
  { id: 2, nombre: "María Gómez",      correo: "maria.gomez@example.com"      },
  { id: 3, nombre: "Carlos Rodríguez", correo: "carlos.rodriguez@example.com" },
  { id: 4, nombre: "Laura Martínez",   correo: "laura.martinez@example.com"   },
  { id: 5, nombre: "Andrés López",     correo: "andres.lopez@example.com"     },
];

function buscarUsuario(id) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      const encontrado = usuarios.find(function(u) {
        return u.id === Number(id);
      });

      if (encontrado) {
        resolve(encontrado);
      } else {
        reject("No se encontró un usuario con ID: " + id);
      }
    }, 2000);
  });
}

function mostrarCargando() {
  const area = document.getElementById("area");
  area.innerHTML = '<p class="cargando">Buscando usuario...</p>';
}

function mostrarUsuario(usuario) {
  const area = document.getElementById("area");
  area.innerHTML = `
    <div class="tarjeta">
      <p><strong>ID:</strong> ${usuario.id}</p>
      <p><strong>Nombre:</strong> ${usuario.nombre}</p>
      <p><strong>Correo:</strong> ${usuario.correo}</p>
    </div>
  `;
}

function mostrarError(mensaje) {
  const area = document.getElementById("area");
  area.innerHTML = `<p class="error"> ${mensaje}</p>`;
}

const boton = document.getElementById("boton");

boton.addEventListener("click", function() {
  const id = document.getElementById("campo").value.trim();

  if (id === "") {
    mostrarError("Por favor ingresa un ID.");
    return;
  }

  mostrarCargando();

  buscarUsuario(id)
    .then(function(usuario) {
      mostrarUsuario(usuario);
    })
    .catch(function(error) {
      mostrarError(error);
    })
    .finally(function() {
      console.log("Búsqueda finalizada.");
    });
});