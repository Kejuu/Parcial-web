/**
 * Aquì se encuentran los metodos para el crud de los seguimientos
 */

export default {
    data() {
        
        return {
            
            enEdicion: false,
            
            //se guardan todos los seguimientos nuevos que se ingresan 
            automovil: {
                
                placa: "",
                color: "",
                marca: "",
                ciudad: "",
                auto: null,
                fecha: null,
                hora: null,
                acciones: true
            },
            //se inicializa el array seguimientos para luego guardar todos los seguimientos ahi
            informacion_vehiculos: [
                {
                    placa: "",
                    color: "",
                    marca: "",
                    ciudad: "",
                    auto: null,
                    fecha: null,
                    hora: null,
                    acciones: true
                }
            ],
            /*
            lista_mostrar: [
                {
                    placa: "",
                    color: "",
                    marca: "",
                    ciudad: "",
                    estado: null,
                    fecha: null,
                    hora: null,
                }
            ],
            */
            auto: [
                { value: null, text: "", disabled: true },
                { value: "CARRO", text: "CARRO" },
                { value: "MOTO", text: "MOTO" },
                { value: "BICICLETA", text: "BICICLETA" },
                { value: "CAMION", text: "CAMION" }
            ]

            , show: true
        }

    },
    //aca apenas se carga la pagina se llama el metodo para guardar en el local storage
    mounted() {
        this.local()
    },
    methods: {
        //creamos los seguimientos y los añadimos al array
        crearAuto() {
            let encontrado=false;
            for (let index = 0; index < this.informacion_vehiculos.length; index++) {
                if (this.informacion_vehiculos[index].placa == this.automovil.placa) {
                
                    window.alert("PLACA YA REGISTRADA");
                    encontrado=true;
                }else{
                    encontrado=false;
                }
            }
            if (encontrado==false){
                var hoy = new Date();
                var fechas = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
                var horas = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();    
                this.automovil.fecha=fechas;
                this.automovil.hora=horas;
                this.informacion_vehiculos.push(this.automovil);  
            }

            this.automovil = {
                placa: "",
                color: "",
                marca: "",
                ciudad: "",
                auto: null,
                fecha: null,
                hora: null,
                acciones: true
            };
            localStorage.setItem('automoviles', JSON.stringify(this.informacion_vehiculos));
            
        },
        //eliminanos un seguimiento segun el item que se le pase por parametro
        eliminarAuto({ item }) {
            let posicion = this.informacion_vehiculos.findIndex(
                automovil => automovil == item
            );
            this.informacion_vehiculos.splice(posicion, 1);
            localStorage.setItem('automoviles', JSON.stringify(this.informacion_vehiculos));
        },
        //este metodo nos pone en el formulario todos los datos del seguimiento que quieren editar
        cargarAuto({ item }) {
            let se = this.informacion_vehiculos.find(
                automovil => automovil.placa == item.placa
            );
            this.enEdicion = true;
            this.automovil = Object.assign({}, se);
            localStorage.setItem('automoviles', JSON.stringify(this.informacion_vehiculos));
        },
        //estes metodo se llama luego de que se hace un cambio en un seguimiento ya existente,
        //para que quede guardado con sus nuevos valores
        actualizarAuto() {
            let se = this.informacion_vehiculos.find(
                automovil => this.automovil.placa == automovil.placa   
            );
            this.enEdicion = false;
            this.informacion_vehiculos.splice(se, 1, this.automovil);
            this.automovil = Object.assign({}, se);
            localStorage.setItem('automoviles', JSON.stringify(this.informacion_vehiculos));
        },
        darSalida() {
            let se = this.informacion_vehiculos.find(
                automovil => automovil.placa == automovil.placa
            );
            let hoy = new Date();
                let hora1 = (se.hora).split(":");
                let hora2 = ("05:33:11").split(":");
                let t1 = new Date();
                let t2 = new Date();
            
            t1.setHours(hora1[0], hora1[1], hora1[2]);
            t2.setHours(hora2[0], hora2[1], hora2[2]);
            let hora = (hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds()).split(":");
            //Aquí hago la resta
            t1.setHours(t1.getHours() - t2.getHours(), t1.getMinutes() - t2.getMinutes(), t1.getSeconds() - t2.getSeconds());
            let horap = (t1.getHours() ? t1.getHours() + (t1.getHours() > 1 ? " horas" : " hora") : "") + (t1.getMinutes() ? ", " + t1.getMinutes() + (t1.getMinutes() > 1 ? " minutos" : " minuto") : "") + (t1.getSeconds() ? (t1.getHours() || t1.getMinutes() ? " y " : "") + t1.getSeconds() + (t1.getSeconds() > 1 ? " segundos" : " segundo") : "");
            this.enEdicion = true;
            this.automovil = Object.assign({}, se);
            let difhora = hora2[0] - hora1[0]
            window.alert(difhora);
            let precio;
            if (se.auto == "CARRO"){
                precio=difhora*8000
            }else if (se.auto == "MOTO"){
                precio=difhora*4000
            }else if (se.auto == "BICILETA"){
                precio=difhora*2000
            }else if (se.auto == "CAMIÓN"){
                precio=difhora*21000
            }
            window.alert(precio);
            
        },
        //metodo para guardar la lista de seguimientos en el local storage
        local() {
            var datosLocal = JSON.parse(localStorage.getItem('automoviles'));
            var datosInfo = JSON.parse(localStorage.getItem('info'));
            if (datosLocal === null) {
                this.informacion_vehiculos = [];
            } else {
                this.informacion_vehiculos = datosLocal;
            }
            //llenamos la lista de publicaciones con la informacion del local storage
            //para poder recorrerla y compararla con la lista de seguimientos
            if (datosInfo === null) {
                this.lista_publicaciones = [];
            } else {
                this.lista_publicaciones = datosInfo;
            }
        },



        /*
        buscar() {
            for (let index = 0; index < this.informacion_vehiculos.length; index++) {
                for (let j = 0; j < this.informacion_vehiculos.length; j++) {
                    if (this.lista_publicaciones[index].id == this.informacion_vehiculos[j].tarea) {
                        var temp = {
                            id: this.lista_publicaciones[index].id,
                            nombre: this.lista_publicaciones[index].titulo,
                            estado: this.informacion_vehiculos[index].estado
                        }
                        
                    }
                }
            }

        }
        */


    }

};