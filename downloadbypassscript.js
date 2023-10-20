
// GLOBAL SETTINGS
html2canvas // test if the library has been correctly loaded
var divPagePrefix = "pageSection" // the algorithm will collect all divs starting with this prefix followed by one page number
var nbPages = 76 // the algorithm will look for all pages between 1 and nbPages
var pages = [] // this global variable is used to store results in case of multiple iterations
var imageSizeThreshold = 10000 // images below this size will be rejected. Some websites render grey pages until the user scrolls closer to the page.

// ITERATION (CAN BE LAUNCHED MULTIPLE TIMES UNTIL done!!! APPEARS
for(lPageNb = 1; lPageNb <= nbPages; lPageNb++){
		var lDivName = divPagePrefix + lPageNb
		var lDiv = document.getElementById(lDivName)
			
		if(pages[lPageNb] == null){
			if(lDiv != null){
				console.log("queried " + lDivName + " found " + lDiv.getBoundingClientRect().height + " " + lDiv.getBoundingClientRect().width)
				await html2canvas(lDiv).then(canvas => {
						var myImage = canvas.toDataURL();
						var head = 'data:image/png;base64,';
						var imgFileSize = Math.round((myImage.length - head.length)*3/4) ;
						console.log("> image created " + lDivName + " has size " + imgFileSize);
						if(imgFileSize > imageSizeThreshold){
							pages[lPageNb] = myImage
							var link = document.createElement("a");
							link.download = lDivName;
							link.href = myImage;
							document.body.appendChild(link);
							link.click();   
						}
						else {
							console.log("- invalid image " + lDivName + ", skipping")
						}
				});
			}
			else {
				console.log("- div missing: " + lDivName + " " + lDiv + " -" + document.getElementById(lDivName))
			}
		}
		else{
			console.log("- skipping: " + lDivName + ", already existed in global array of size " + pages.filter(Boolean).length)
		}
	}
	console.log("after this iteration, we have downloaded " + pages.filter(Boolean).length + " sections") 
	if (pages.filter(Boolean).length == nbPages){
			console.log("- done!!!")
	}
}
