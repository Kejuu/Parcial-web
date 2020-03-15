<template>
  <b-card
    title="Parqueadero"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 50rem;"
    class="mb-2"
    v-show="true"
  >
    <b-card-body>
      <b-form action="javascript:void(0)" @submit="crearAuto()">
            <b-form-group id="in-placa" label="Placa:" label-for="placa">
                  <b-form-input
                    id="Placa"
                    v-model="automovil.placa"
                    required
                    placeholder="Ingrese placa"
                  ></b-form-input>
                </b-form-group>

        <b-form-group id="in-color" label="Color:" label-for="color">
          <b-form-input
            id="Color"
            v-model="automovil.color"
            required
            placeholder="Ingrese el color del vehiculo"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="in-marca" label="Marca:" label-for="marca">
          <b-form-input
            id="marca"
            v-model="automovil.marca"
            required
            placeholder="Ingrese marca"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="in-ciudad" label="Ciudad:" label-for="ciudad">
          <b-form-input
            id="ciudad"
            v-model="automovil.ciudad"
            required
            placeholder="Ingrese ciudad"
          ></b-form-input>
        </b-form-group>

        <b-form-group>
          <b-form-select v-model="automovil.auto" :options="auto"></b-form-select>
        </b-form-group>
        

        <b-button type="submit" variant="primary" v-if="!enEdicion">Registrar</b-button>
        <b-button @click="actualizarAuto()" variant="primary" v-else>Actualizar datos</b-button>
        <b-table striped hover :items="informacion_vehiculos">
          <template v-slot:cell(acciones)="row">
            <div>
              
              <b-button size="sm" @click="cargarAuto(row)" class="mr-2">Modificar</b-button>
              <b-button size="sm" @click="eliminarAuto(row)" class="mr-2">Eliminar</b-button>
              <b-button size="sm" class="mr-2">Dar salida</b-button>
            </div>
          </template>
        </b-table>
      </b-form>
    </b-card-body>
  </b-card>
</template>

<script src="@/assets/seguimiento-revision.js"/>  