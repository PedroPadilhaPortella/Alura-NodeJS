const jsontoxml = require('jsontoxml')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')

class Serializador {
    json(data) {
        return JSON.stringify(data);
    }

    xml(data) {
        let tag = this.tagSingular
        
        if(Array.isArray(data)) {
            tag = this.tagPlural
            data = data.map(item => { 
                return {[this.tagSingular]: item } 
            })
        }

        return jsontoxml({[tag]: data})
    }

    serialize(data) {
        data = this.filtrar(data)
        if(this.contentType === 'application/json') {
            return this.json(data)
        }

        if(this.contentType === 'application/xml') {
            return this.xml(data)
        }

        throw new ValorNaoSuportado(this.contentType);
    }

    filtrarObjeto(elemento) {
        const dadoFiltrado = {}
        
        this.camposPublicos.forEach(campo => {
            if(elemento.hasOwnProperty(campo)) {
                dadoFiltrado[campo] = elemento[campo]
            }
        })

        return dadoFiltrado;
    }

    filtrar(data) {
        if(Array.isArray(data)) {
            data = data.map((objeto) => this.filtrarObjeto(objeto))
        } else {
            data = this.filtrarObjeto(data)
        }

        return data;
    }
}

class SerializadorFornecedor extends Serializador {
    
    constructor(contentType, camposExtras) {
        super()
        this.tagSingular = 'fornecedor'
        this.tagPlural = 'fornecedores'
        this.contentType = contentType
        this.camposPublicos = ['id', 'empresa', 'categoria'].concat(camposExtras || [])
    }
}

class SerializadorError extends Serializador {
    
    constructor(contentType, camposExtras) {
        super()
        this.tagSingular = 'error'
        this.tagPlural = 'errors'
        this.contentType = contentType
        this.camposPublicos = ['id', 'message'].concat(camposExtras || [])
    }
}

module.exports = {
    Serializador: Serializador, 
    SerializadorFornecedor: SerializadorFornecedor, 
    SerializadorError: SerializadorError,
    formatosAceitos: [
        'application/json',
        'application/xml'
    ]
}