export default {
    props: {
        value: Boolean,
        label: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isActive: false,
            id: null,
        }
    },
    created() {
        this.id = this.$root.getUniqId();
        this.isActive = this.value;
    },
    methods: {
        onChangeActivity() {
            this.$refs.input.checked = !this.$refs.input.checked;
            this.isActive = this.$refs.input.checked;  
            this.emitActive()
        },
        emitActive() {
            this.$emit('input', this.isActive)
        },
    }
}