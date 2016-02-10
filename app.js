var app = angular.module("PokeProfileApp", []);

app.service("PokemonService", ["$http", function ($http) {
    this.currentPokemon = {};

    this.fetchPokemonByNumber = function (pokemonId) {
        return $http.get("http://pokeapi.co/api/v1/pokemon/" + pokemonId)
            .then(function (response) {
                var pokemon = response.data;
                console.log(pokemon);
                this.currentPokemon = {
                    name: pokemon.name,
                    attack: pokemon.attack,
                    ability: pokemon.abilities[0]
                };
                return $http.get("http://pokeapi.co" + pokemon.sprites[0].resource_uri)
            }).then(function (response) {
                this.currentPokemon.sprite = "http://pokeapi.co" + response.data.image;
                return this.currentPokemon;
            });
    }
}]);


app.controller("PokeController", ["$scope", "PokemonService", function ($scope, PokemonService) {

    $scope.getPokemonInfo = function () {
        PokemonService.fetchPokemonByNumber($scope.pokemonNumber).then(function (data) {
            $scope.pokemon = data;
            console.log("$scope.pokemon: " + JSON.stringify($scope.pokemon));
        });
    }
}]);