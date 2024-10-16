import os

from behave import given, step, then, when
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

load_dotenv()
LOGIN_SIGN_UP_URI = os.environ.get("VITE_LOGIN_SIGN_UP")


@given("a logged-in user,")
def given_a_logged_in_user(context):
    context.driver = webdriver.Chrome()

    context.driver.get(LOGIN_SIGN_UP_URI)
    
    username_input = context.driver.find_element(By.ID, "signInFormUsername")
    password_input = context.driver.find_element(By.ID, "signInFormPassword")
    username_input.send_keys("usertest")
    password_input.send_keys("Qawsed-12")

    assert username_input is not None
    assert password_input is not None

    login_button = context.driver.find_element(By.NAME, "signInSubmitButton")
    login_button.click()

    wait = WebDriverWait(context.driver, 10)
    wait.until(EC.url_to_be("http://localhost:8080/"))

@when("they select the “Logout“ option,")
def they_select_the_logout_option(context):
    logout_button = context.driver.find_element(By.XPATH, "/html/body/div/div[2]/nav/div/div/div[3]/div/button")
    logout_button.click()

@then("they should be logged out of the platform.")
def they_should_be_logged_out_of_the_platform(context):
    wait = WebDriverWait(context.driver, 10)
    wait.until(EC.visibility_of_element_located((By.XPATH, "/html/body/div/div[2]/nav/div/div/div[3]/div/a[1]/button")))
    login_button = context.driver.find_element(By.XPATH, "/html/body/div/div[2]/nav/div/div/div[3]/div/a[1]/button")
    assert login_button is not None


