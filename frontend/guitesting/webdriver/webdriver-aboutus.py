from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
import time

driver = webdriver.Chrome() 
driver.maximize_window()



    driver.get("http://localhost:3000/about-us")
    driver.set_window_size(1512, 857)

    
    back_to_home_button = driver.find_element(By.CSS_SELECTOR, ".back-home-button")
    back_to_home_button.click()

    sign_up_link = driver.find_element(By.LINK_TEXT, "Sign Up")
    ActionChains(driver).move_to_element(sign_up_link).perform()

    home_link = driver.find_element(By.LINK_TEXT, "Home")
    ActionChains(driver).move_to_element(home_link).perform()

  
    about_us_link = driver.find_element(By.LINK_TEXT, "About Us")
    about_us_link.click()

 
    about_heading = driver.find_element(By.CSS_SELECTOR, ".about-website > h2")
    about_heading.click()

   
    paragraph = driver.find_element(By.CSS_SELECTOR, "p")
    paragraph.click()

    
    team_photo_1 = driver.find_element(By.CSS_SELECTOR, ".team-card:nth-child(1) > .team-photo")
    team_photo_1.click()

   
    instagram_1 = driver.find_element(By.CSS_SELECTOR, ".team-card:nth-child(1) .instagram")
    instagram_1.click()

  
    driver.switch_to.window(driver.window_handles[1])
    time.sleep(2)
    driver.close() 
    driver.switch_to.window(driver.window_handles[0]) 

  
    team_photo_2 = driver.find_element(By.CSS_SELECTOR, ".team-card:nth-child(2) > .team-photo")
    team_photo_2.click()

  
    instagram_2 = driver.find_element(By.CSS_SELECTOR, ".team-card:nth-child(2) .instagram")
    instagram_2.click()

  
    driver.switch_to.window(driver.window_handles[1])
    time.sleep(2)
    driver.close()
    driver.switch_to.window(driver.window_handles[0])

   
    instagram_3 = driver.find_element(By.CSS_SELECTOR, ".team-card:nth-child(3) .instagram > .fab")
    instagram_3.click()

    driver.switch_to.window(driver.window_handles[1])
    time.sleep(2)
    driver.close()  
    driver.switch_to.window(driver.window_handles[0])  


    time.sleep(5)
    driver.quit()
