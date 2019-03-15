import _ from 'lodash';
import jsonPlaceholder from '../api/jsonPlaceholder';

export const fetchPostsAndUsers = () => {
    return async (dispatch, getState) => {
        await dispatch(fetchPosts());

        const userIds = _.uniq(_.map(getState().posts, 'userId'));
        userIds.forEach((id) => {
            dispatch(fetchUsers(id))
        });
    };
};

export const fetchPosts = () => {
    return async (dispatch) => {
        const response = await jsonPlaceholder.get('/posts');

        dispatch({
            type: 'FETCH_POSTS',
            payload: response.data
        });
    };
};

export const fetchUsers = (id) => {
    return async (dispatch) => {
        const response = await jsonPlaceholder.get(`/users/${id}`);

        dispatch({
            type: 'FETCH_USERS',
            payload: response.data
        });
    };
};