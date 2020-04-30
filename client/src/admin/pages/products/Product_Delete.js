import axios from 'axios'

const Product_Delete = async (props, id) => {
    if (id) {
        await axios.post(`http://diplom/server/admin/delete_product`, JSON.stringify({
            id: id
        }))
            .then(res => {
                return props.history.push('/admin/products');
            })
    }

};

export { Product_Delete }