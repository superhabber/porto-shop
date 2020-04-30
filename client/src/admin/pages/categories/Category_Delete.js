import axios from 'axios'

const Category_Delete = async (props, id) => {

    if (id) {
        await axios.post(`http://diplom/server/admin/delete_category`, JSON.stringify({
            id: id
        }))
            .then(res => {
                return props.history.push('/admin/categories');
            })
    }
};

export { Category_Delete }