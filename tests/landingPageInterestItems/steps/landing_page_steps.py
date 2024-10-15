import os

from behave import given, step, then, when
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.common.by import By

load_dotenv()
LOGIN_SIGN_UP_URI = os.environ.get("VITE_LOGIN_SIGN_UP")

pages = {
    "login_sign_up": LOGIN_SIGN_UP_URI,
}


@given("a new user,")
def given_a_new_user(context):
    context.driver = webdriver.Chrome()


@when("they visit the landing page")
def they_visit_the_landing_page(context):
    context.driver.get("http://localhost:8080/")


@step("select “{button_text}“ button,")
def select_button_with_text(context, button_text):
    login_button = context.driver.find_element(By.XPATH, f"//button[text()='{button_text}']")
    login_button.click()


@then("the user should be redirected to the {page_name} page.")
def the_user_should_be_redirected_to_the_login_sign_up_page(context, page_name):
    current_url = context.driver.current_url
    expected_url = pages[page_name]
    assert expected_url is not None
    assert current_url == expected_url


@then('there should exist a "{button_text}" button')
def there_should_exist_a_button_named(context, button_text):
    button = context.driver.find_element(By.XPATH, f"//button[text()='{button_text}']")
    assert button is not None
