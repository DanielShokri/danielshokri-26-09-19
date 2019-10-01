import React from 'react';
import { connect } from 'react-redux';

import FavoritePreview from '../../Components/FavoritePreview/FavoritePreview.cmp';
import './favoritepage.styles.scss';


const FavoritePage = ({ favorites }) => {
    return (
        <div className="favorite-page">
            <h1>Your Favorites</h1>
            <div className="favorite-cards">
                {
                    favorites.length ? favorites.map(favorite => (
                        <FavoritePreview key={favorite.id} favorite={favorite} />
                    ))
                        :
                        'Not having any favorites... for now 😉'
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    const { favoriteReducer } = state;
    return {
        favorites: favoriteReducer.favorites
    }
}

export default connect(mapStateToProps)(FavoritePage);