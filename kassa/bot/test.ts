import puppeteer from "puppeteer";

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1024 });

  // Navigate the page to a URL
  await page.goto(
    "https://mijnzakelijk.ing.nl/banking/payment/request?navigation-data=frf889&flow-step=new-request"
  );

  const usernameSelector = 'input[name="username"]';
  await page.waitForSelector(usernameSelector);

  const usernameEl = await page.$('input[name="username"]');
  console.log(usernameEl);
  await usernameEl?.type("xaniasoftware");
  const passwordEl = await page.$('input[name="password"]');
  console.log(passwordEl);
  await passwordEl?.type("Xania1981!");

  const submitEl = await page.$('[type="submit"]');
  await submitEl?.click();

  // Get all shadow hosts on the page
  const shadowHosts = await page.$$("*");

  // Iterate over each shadow host
  for (const shadowHost of shadowHosts) {
    // Access the shadow root
    const shadowRoot = await shadowHost.evaluate((el) => el.shadowRoot);
    console.log(shadowRoot);

    // Search for the element inside the shadow root using >>> combinator
    const elementsInShadowRoot = await page.$$(".your-element-selector");

    // Do something with the elements found (for example, log their text content)
    for (const element of elementsInShadowRoot) {
      const textContent = await element.evaluate((el) => el.textContent);
      console.log("Found element with text content:", textContent);
    }
  }

  await page.waitForSelector(
    "#app >>> #configRenderer >>> #experienceRenderer >>> ing-feat-payment-request >>> ing-flow >>> ing-step-new-payment-request >>> ",
    {}
  );
  console.log("pr amount ready");
  // const prAmoutEl = await page.$('input[name="prAmount"]');
  // await prAmoutEl?.type("100");

  // // Set screen size
  // await page.setViewport({ width: 1080, height: 1024 });

  // // Type into search box
  // await page.type(".devsite-search-field", "automate beyond recorder");

  // console.log("2");
  // // Wait and click on first result
  // const searchResultSelector = ".devsite-result-item-link";
  // await page.waitForSelector(searchResultSelector);
  // await page.click(searchResultSelector);

  // // Locate the full title with a unique string
  // console.log("3");
  // const textSelector = await page.waitForSelector(
  //   "text/Customize and automate"
  // );
  // console.log("4");
  // const fullTitle = await textSelector?.evaluate((el) => el.textContent);

  // // Print the full title
  // console.log('The title of this blog post is "%s".', fullTitle);

  await delay(10000);
  await browser.close();
})();

function delay(duration = 1000) {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve(null);
    }, duration);
  });
}
