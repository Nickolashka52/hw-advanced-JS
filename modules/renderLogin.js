import { fetchAndRenderComments } from "../index.js";
import { login, setName, setToken } from "./api.js";
import { renderRegistration } from "./renderRegistration.js";

export const renderLogin = () => {
    const container = document.querySelector(".container");

    const loginHtml = `
    <section class="add-form">
      <h1>Форма входа</h1>
      <input 
        type="text" 
        calss="add-form-name" 
        placeholder="Введите логин" 
        id="login"
        required
      />
      <input 
        type="text" 
        calss="add-form-name" 
        placeholder="Введите пароль" 
        id="password"
        required
      />
      <fieldset class="add-form-registry">
        <button class="add-form-button-main button-main" type="submit">
            Войти</button>
        <button class="add-form-button-link registry">
            Зарегестрироваться
        </button>
      </fieldset>
    </section>
    `;

    container.innerHTML = loginHtml;

    document.querySelector(".registry").addEventListener("click", () => {
        renderRegistration();
    });

    const loginEl = document.querySelector("#login");
    const passwordEl = document.querySelector("#password");
    const submitButtonEl = document.querySelector(".button-main");

    submitButtonEl.addEventListener("click", () => {
        login(loginEl.value, passwordEl.value)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setToken(data.user.token);
                setName(data.user.name);
                fetchAndRenderComments();
            });
    });
};
