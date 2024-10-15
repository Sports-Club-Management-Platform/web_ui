import os

from behave import given, step, then, when
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.common.by import By


@given("a logged-in user,")
def given_a_logged_in_user(context):
    context.driver = webdriver.Chrome()
    context.driver.get("http://localhost:8080/")

@when("they select the “Logout“ option,")
def they_select_the_logout_option(context):
    logout_button = context.driver.find_element(By.XPATH, "//*[@id=\"root\"]/div[2]/nav/div/div/div[3]/div/button")
    logout_button.click()

@then("they should be logged out of the platform.")
def they_should_be_logged_out_of_the_platform(context):
    login_button = context.driver.find_element(By.XPATH, f"//button[text()='{"Login"}']")
    assert login_button is not None


