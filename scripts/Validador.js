class Validador {
    validarMateria(materia){
        if(materia.length === 0){
            return [false,"materia no puede estar vacio"];
        }
        return [true,""];
    }
    validarUnidad(unidad){
        console.log(unidad) ;
        if(!unidad){
            return [false,"unidades no puede estar vacio"];
        }
        if(unidad < 1 || unidad > 15){
            return [false,"las unidades son de la 1 a la 15"];
        }
        return [true,""];
    }
    validarCalificacion(calificacion){
        if(!calificacion){
            return [false,"calificacion no puede estar vacio"];
        }
        if(calificacion < 0 ||  calificacion > 100){
            return [false,"las calificaciones van de 0 a 100"];
        }
        return [true,""];
    }
}

