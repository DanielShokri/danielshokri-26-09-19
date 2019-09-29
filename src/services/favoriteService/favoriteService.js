
export default {
    addCityToFavorites,
    deleteFavorite
}

function addCityToFavorites(favorites, favoriteToAdd) {
    const exitingFavorite = favorites.find(favorite => favorite.id === favoriteToAdd.id);

    if (exitingFavorite) {
        return favorites.map(favorite => {
            return favorite.id === favoriteToAdd.id
                ? { ...favorite } :
                favorite
        })
    }

    return [...favorites, { ...favoriteToAdd }];

}

function deleteFavorite(favorites, favoriteToDelete) {
    const filteredFavorites = favorites.filter(item => item.id !== favoriteToDelete.id);
    return filteredFavorites
}