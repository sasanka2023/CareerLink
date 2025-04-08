package com.example.CarrerLink_backend;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.Duration;

@SpringBootTest
class CarrerLinkBackendApplicationTests {

	@Test
	void contextLoads() {
	}
	public static void main(String[] args) throws InterruptedException {


		WebDriver driver = WebDriverManager.chromedriver().create();
		driver.manage().window().maximize();
		driver.get("http://localhost:3000/");
		Thread.sleep(2000);

		// Check if logo is displayed
		WebElement logo = driver.findElement(By.xpath("//a[contains(text(), 'CareerLink')]"));
		Thread.sleep(4000);
		System.out.println("Logo displayed passed: " + logo.isDisplayed());

		// Navigation links
		//String[] navLinks = {"Home", "Jobs", "Employers", "Courses", "Contact"};
		//for (String link : navLinks) {
		//	WebElement nav = driver.findElement(By.linkText(link));
		//	Thread.sleep(4000);
		//	System.out.println(link + " link displayed: " + nav.isDisplayed());
		//}

		// Click on the login button
		driver.findElement(By.xpath("//a[contains(text(), 'Find Opportunities')]")).click();
		System.out.println("Clicked on Find Opportunities button passed");
		Thread.sleep(4000);

		// Wait for the login form to be visible
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

		// Wait until username input is visible
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@id='username']")));

		// Fill username and password
		driver.findElement(By.xpath("//input[@id='username']")).sendKeys("freeguy");
		driver.findElement(By.xpath("//input[@id='password']")).sendKeys("12345678"); // Use your test password

		System.out.println("Filled login form passed");

		// Click on Sign In button
		driver.findElement(By.xpath("//button[contains(text(), 'Sign in')]")).click();
		System.out.println("Clicked Sign In button passed");
		Thread.sleep(8000);

		// Wait for redirect to home page (adjust URL if your home path differs)
		//wait.until(ExpectedConditions.urlToBe("http://localhost:3000/home"));
		//Thread.sleep(4000);
		//System.out.println(" Redirected to Home Page");

		WebDriverWait wait2 = new WebDriverWait(driver, Duration.ofSeconds(10));
		WebElement logoutBtn = wait2.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[contains(., 'Logout')]")));
		logoutBtn.click();
		System.out.println("Clicked on Logout button passed");
		Thread.sleep(8000);

		// Click on the company login button
		driver.findElement(By.xpath("//a[contains(text(), 'For Companies')]")).click();
		System.out.println("Clicked on For Companies button passed");
		Thread.sleep(4000);

		// Wait for the login form to be visible
		WebDriverWait wait3 = new WebDriverWait(driver, Duration.ofSeconds(10));

		// Wait until username input is visible
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@id='username']")));

		// Fill username and password
		driver.findElement(By.xpath("//input[@id='username']")).sendKeys("em");
		driver.findElement(By.xpath("//input[@id='password']")).sendKeys("12345678"); // Use your test password

		System.out.println("Filled Company login form passed");

		// Click on Sign In button
		driver.findElement(By.xpath("//button[contains(text(), 'Sign in')]")).click();
		System.out.println("Clicked Sign In button passed");
		Thread.sleep(8000);

		WebDriverWait wait4 = new WebDriverWait(driver, Duration.ofSeconds(10));
		WebElement HomeBtn = wait4.until(ExpectedConditions.elementToBeClickable(By.xpath("//a[contains(text(), 'Home')]")));
		HomeBtn.click();
		System.out.println("Clicked on Home button passed");
		Thread.sleep(8000);

		WebDriverWait wait5 = new WebDriverWait(driver, Duration.ofSeconds(10));
		WebElement JobBtn = wait5.until(ExpectedConditions.elementToBeClickable(By.xpath("//a[contains(text(), 'Jobs')]")));
		JobBtn.click();
		System.out.println("Clicked on jobs button passed");
		Thread.sleep(8000);

		WebDriverWait wait6 = new WebDriverWait(driver, Duration.ofSeconds(10));
		WebElement EmployersBtn = wait6.until(ExpectedConditions.elementToBeClickable(By.xpath("//a[contains(text(), 'Employers')]")));
		EmployersBtn.click();
		System.out.println("Clicked on Employers button passed");
		Thread.sleep(8000);

		WebDriverWait wait7 = new WebDriverWait(driver, Duration.ofSeconds(10));
		WebElement CoursesBtn = wait7.until(ExpectedConditions.elementToBeClickable(By.xpath("//a[contains(text(), 'Courses')]")));
		CoursesBtn.click();
		System.out.println("Clicked on Courses button passed");
		Thread.sleep(8000);

		WebDriverWait wait8 = new WebDriverWait(driver, Duration.ofSeconds(10));
		WebElement ContactBtn = wait8.until(ExpectedConditions.elementToBeClickable(By.xpath("//a[contains(text(), 'Contact')]")));
		ContactBtn.click();
		System.out.println("Clicked on Contact button passed");
		Thread.sleep(8000);

		driver.quit();




	}


}


