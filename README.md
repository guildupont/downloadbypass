# Downloadbypass
Box, Onedrive, Allego, Sharepoint and other sometimes prevent you from downloading files and priting from your browser. Not anymore with this script.

# Context
Some sites have implemented specific web-based PDF readers to ensure that PDF content cannot be downloaded. In general, these websites will also prevent you from printing the page, by rendering a white page when printing. This is a common functionality called "prevent download".

This algorithm tries another approach which is to snapshot the HTML content of the webpage directly on the client using javascript executing in the browser's console. Once the content has been retrieved, PNG images are downloaded. It is easy to extend this algorithm to publish a PDF if needed.

Some websites are particularily nasty and will limit the number of pages or slides rendered at the same time. This is not an issue. This algorithm can detect when the content is not yet ready to be downloaded. The user can scroll over the document, render missing pages, and run the script again. The script will gather new pages incrementally, and indicate "done !" when all slides have been downloaded.

# Prerequisites
Before running the algorithm, you need to identify the structure of the page rendering the PDF document. This can be done by right clicking on the page in your browser and clicking on "Inspect". The HTML code will generally contain a set of divs called "page N", "slide N", "section N", etc. Update the divPagePrefix variable with this prefix.

Next, update the nbPages variable with the number of pages contained in the document. 

If needed, adjust the imageSizeThreshold variable which helps ignoring pages that do not render correctly.

# Execution
1. Open your browser's javascript console using F12
2. Execute the html2canvas plugin in your browser's console by retrieving the js code here:  https://html2canvas.hertzen.com/dist/html2canvas.js
3. Initialize the three global variables
4. Execute the for loop to iterate over the content. This will start to download available images. Repeat this process multiple times in case the rendering of the sections does not all happen at the same time
5. That's it! Once the "done !!!" log appears, all images have been successfully downloaded as PNG.



# Examples:
- For Allego:
  - var divPagePrefix = "pageSection"
  - relaunch the loop multiple times after scrolling over the page until all pages have been collected
 
- For Box:
  -  var divPagePrefix = "bp-page-"
  -  launch

