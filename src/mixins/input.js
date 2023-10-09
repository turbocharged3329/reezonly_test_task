export default {
    props: {
        placeholder: {
            type: String,
            default: ''
        },
        error: {
            type: String
        }
    },
    data() {
        return {
            isFocused: false,
        }
    },
    methods: {
        onInputChangeFocus(e) {
            this.isFocused = document.activeElement === e.target;
        }
    }
}