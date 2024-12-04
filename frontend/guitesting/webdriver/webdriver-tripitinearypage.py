from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager


driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))


driver.get("http://localhost:3000/trip/1")


driver.set_window_size(1512, 870)

button = driver.find_element(By.CSS_SELECTOR, ".MuiButtonBase-root")
ActionChains(driver).move_to_element(button).perform()
button.click()


ActionChains(driver).move_to_element_with_offset(button, 0, 0).perform()

import time
time.sleep(3)

driver.quit()
