import axios from 'axios'

const Color_Delete = async (props, id) => {
    //console.log(id)
    if (id) {
        await axios.post(`http://diplom/server/admin/delete_color`, JSON.stringify({
            id: id
        }))
            .then(res => {
                return props.history.push('/admin/colors');
            })
    }



};

export { Color_Delete }