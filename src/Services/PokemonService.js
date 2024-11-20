import axios from "axios";

function getAllPokemon(offset = 0, limit = 21) {
    return axios.get("https://pokeapi.co/api/v2/pokemon?offset=" + offset + "&limit=" + limit);
}

function getPokemonById(id) {

    return axios.get ("https://pokeapi.co/api/v2/pokemon-species/" + id);
}

function getPokemonById2(id) {

    return axios.get ("https://pokeapi.co/api/v2/pokemon/" + id);
}


function getForceFaiblesse(id){
    return axios.get (" https://pokeapi.co/api/v2/type/"+id);
}

function getPokemonTypes(){

    return axios.get(" https://pokeapi.co/api/v2/type/");
}

function getPokemonByType(type){

    return axios.get(" https://pokeapi.co/api/v2/type/" + type);
}

export default {
    getAllPokemon,
    getPokemonById,
    getPokemonById2,
    getForceFaiblesse,
    getPokemonTypes,
    getPokemonByType
};