<template>
    <form class="registration-form">
        <section class="registration-form__header">
            <h2 class="title">Регистрация</h2>
        </section>
        <section class="registration-form__body">
            <div class="registration-form__type">
                <custom-toggler 
                    :label="'Публичный профиль'" 
                    :description="'Включает профиль для просмотра другими пользователями по ссылке'"
                    v-model="isPublicProfile"
                ></custom-toggler>
            </div>
            <div class="registration-form__data">
                <h3 class="title--secondary">Данные</h3>
                <div class="row">
                    <div class="column">
                        <custom-input 
                            v-model="name" 
                            placeholder="Имя" 
                            type="text"
                            :error="errors.name"
                            @resetValidation="resetValidation('name')"
                        ></custom-input>
                    </div>
                    <div class="column">
                        <custom-select
                            :placeholder="'Должность'"   
                            :items="selectItems" 
                            v-model="selectedPost"
                            :error="errors.post"
                            @resetValidation="resetValidation('post')"
                        >
                        </custom-select>
                    </div>
                </div>
                <div class="row">
                    <div class="column">
                        <custom-input 
                            v-model="email" 
                            placeholder="E-mail" 
                            type="text"
                            :error="errors.email"
                            @resetValidation="resetValidation('email')"
                        ></custom-input>
                    </div>
                    <div class="column"></div>
                </div>
                <div class="row">
                    <div class="column">
                        <custom-input 
                            v-model="password" 
                            placeholder="Пароль" 
                            type="password"
                            :error="errors.password"
                            @resetValidation="resetPasswordsValidation"
                        ></custom-input>
                    </div>
                    <div class="column">
                        <custom-input 
                            v-model="password_repeat" 
                            placeholder="Повторите пароль" 
                            type="password"
                            :error="errors.password_repeat"
                            @resetValidation="resetPasswordsValidation"
                        ></custom-input>
                    </div>
                </div>
            </div>
            <section class="submit-section">
                <p class="submit-section__description">Нажимая на кнопку “Регистрация”, я подтверждаю свое согласение с политикой конфиденциальности и обработки персональных данных</p>
                <custom-checkbox v-model="agreement"></custom-checkbox>
                <button 
                    class="submit-section__button" 
                    type="button"
                    @click="sendForm"
                    :disabled="!agreement"
                >Регистрация</button>
            </section>
        </section>
        <keep-alive>
            <div class="loader" v-if="isLoading">
                <img  src="/loader.svg" class="loader__element" loading="lazy">
            </div>
        </keep-alive>
    </form>
</template>
<script>
import CustomInput from "@/components/CustomInput.component.vue";
import CustomToggler from "@/components/CustomToggler.component.vue";
import CustomSelect from "@/components/CustomSelect.component.vue";
import CustomCheckbox from '@/components/CustomCheckbox.component.vue';

export default {
    name: 'RegistrationForm',
    components: {
        CustomInput,
        CustomToggler,
        CustomSelect,
        CustomCheckbox
    },
    props: {
        defaultValues: {
            type: Object,
            default: () => {}
        }
    },  
    data() {
        return {
            isLoading: false,
            name: '',
            email: '',
            password: '',
            password_repeat: '',
            selectedPost: null, 
            isPublicProfile: false,
            agreement: true,
            selectItems: [
                {
                    id: 1,
                    value: '1',
                    name: 'Должность 1',
                },
                {
                    id: 2,
                    value: '2',
                    name: 'Должность 2',
                },
                {
                    id: 3,
                    value: '3',
                    name: 'Должность 3',
                },
            ],
            errors: {
                name: null,
                post: null,
                email: null,
                password: null,
                password_repeat: null,
            }
        }
    },
    created() {
        Object.keys(this.defaultValues).forEach(key => {
            this[key] = this.defaultValues?.[key];
        })
    },
    methods: {
        resetValidation(fieldName) {
            this.errors[fieldName] = null;
        },
        resetPasswordsValidation() {
            this.resetValidation('password')
            this.resetValidation('password_repeat')
        },
        async sendForm() {
            this.isLoading = true;
            const body = JSON.stringify({
                public: +this.isPublicProfile, 
                username: this.name,
                role: +this.selectedPost,
                email: this.email,
                password: this.password,
                password_repeat: this.password_repeat
            })

            try {
                const response = await fetch('https://lmstestapi.reezonly.com/v1/user/signup', 
                {
                    method: 'POST',
                    body
                })
                const data = await response.json();
                
                if (!data.success) {
                    if (data.errors.length) {
                        const errors = data.errors || {name: ['123']}
                        Object.keys(errors).forEach(error => {
                            this.errors[error] = errors[error][0]; 
                        })
                    }
                } else {
                    this.$emit('success')
                }
            } catch(e) {
                console.warn('Server error');
            } finally {
                this.isLoading = false;
            }

        }
    }
}
</script>
<style lang="scss">
.registration-form {
    width: 958px;
    min-height: 638px;
    height: 638px;
    border-radius: pxToRem(15)  ;
    background-color: $grayscale-50;
    box-sizing: border-box;
    padding-top: 27px;
    padding-bottom: 42px;
    position: relative;
    .title {
        color: $grayscale-900;
        font-size: pxToRem(19);
        font-style: normal;
        font-weight: 700;
        line-height: 142.105%;
        letter-spacing: -0.066px;
        margin: 0;
        margin-bottom: 27px;
        &--secondary {
            color: var(--grayscale-900, #000);
            font-size: pxToRem(16);
            font-style: normal;
            font-weight: 500;
            line-height: 118.75%;
            margin: 0;
            margin-bottom: 25px;
        }
    }

    &__header {
        width: 100%;
        height: fit-content;
        box-sizing: border-box;
        padding: 0 pxToRem(20);
        border-bottom: 1px solid $grayscale-300;
    }
    &__body {
        box-sizing: border-box;
        padding: 27px 27px 42px 27px;
    }
    &__type {
        width: 100%;
        height: fit-content;
        box-sizing: border-box;
        padding-bottom: 27px;
        border-bottom: 1px solid $grayscale-300;
    }
    &__data {
        box-sizing: border-box;
        width: 100%;
        height: fit-content;
        padding-top: 20px;
        padding-bottom: 30.5px;
        border-bottom: 1px solid $grayscale-300;
        
        .row {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
            &:not(:last-of-type) {
                margin-bottom: 25px;
            }
        }
        .column {
            flex-basis: 49%;
            height: auto;
        }
    }
    .submit-section {
        box-sizing: border-box;
        padding: 25px 27px 0 27px;
        color: $grayscale-900;
        font-size: pxToRem(14);
        font-style: normal;
        font-weight: 400;
        line-height: 135.714%;
        letter-spacing: -0.021px;
        &__description {
            margin: 0;
            margin-bottom: 1rem;
            width: 85.6%;
            text-align: left;
        }
        &__button {
            display: block;
            margin: 0 auto;
            cursor: pointer;
            border-radius: pxToRem(9);
            border: 1px solid $green-600;
            box-sizing: border-box;
            padding: pxToRem(10) pxToRem(12);
            color: $green-600;
            font-size: pxToRem(14);
            font-style: normal;
            font-weight: 400;
            line-height: 135.714%;
            letter-spacing: -0.021px;
            background-color: transparent;
            transition: .2s linear;
            width: 234px;
            height: auto;
            &:hover {
                background-color: #e8f8ec;
            }
            &:disabled {
                pointer-events: none;
                opacity: 0.2;
            }
        }
    }
    .loader {
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 999;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0, .2);
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        &__element {
            width: 64px;
            height: 64px;
        }
    }
}
</style>