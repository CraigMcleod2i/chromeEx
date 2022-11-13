(() => {
  // misnomer - just copies css value to clipboard
  const copycolour = (e) => {
    navigator.clipboard.writeText(e.target.textContent.split(": ")[1]);
    alert("Value copied to clipboard \n" + e.target.textContent.split(": ")[1]);
  };
  // adds feedback to buttons on hover
  const hoverBehaviour = (e) => {
    e.target.style.transform = "scale(1.02)";
  };
  // undoes hover behaviour
  const undoHoverBehaviour = (e) => {
    e.target.style.transform = "scale(1)";
  };

  const closeExtensionWin = () => {
    document.querySelector(".cssInspecter").remove();
  };

  // [UNFINISHED] moves extension window around page on click and move
  // doesn't move well at the moment, also resets when ctrl+mousemove restarts
  const moveWindow = (e) => {
    let element = document.querySelector(".cssInspecter");
    element.style.setProperty("left", `${e.clientX}px`);
    element.style.setProperty(
      "top",
      `${e.clientY + element.getBoundingClientRect().height / 2.25}px`
    );
  };
  // main function
  const detectMouse = (e) => {
    // is control key pressed ?
    if (e.ctrlKey) {
      // get all elements below mouse point
      const currentPointArray = document.elementsFromPoint(
        e.clientX,
        e.clientY
      );

      /* 
        map elements with computed style (doesn't have style values otherwise)
        stringify required elements so that unique Set can be generated next
      */
      const preSorting = currentPointArray.map((current) => {
        let computedStyles = getComputedStyle(current);
        return JSON.stringify({
          color: computedStyles.color,
          backgroundColor: computedStyles.backgroundColor,
          fontFamily: computedStyles.fontFamily,
        });
      });

      // generate unique set and map back parsed values
      let coloursInterimArray = [...new Set(preSorting)].map((x) =>
        JSON.parse(x)
      );

      const colours = coloursInterimArray.map((current) => {
        let newElem = document.createElement("span"); // parent element
        let colorElem = document.createElement("button"); // font color elem
        let fontElem = document.createElement("button"); // font family elem
        let backgroundColorElem = document.createElement("button"); // backgroundColor elem
        // set button text for all
        colorElem.innerText = "Font colour: \n" + current.color;
        fontElem.innerText = "Font: \n" + current.fontFamily;
        backgroundColorElem.innerText =
          "BackgroundColour: \n" + current.backgroundColor;
        // set style and add event listeners to all
        [colorElem, fontElem, backgroundColorElem].forEach((x) => {
          x.style.cssText = `background-color:${current.backgroundColor};color:${current.color};width: 90%;margin:0.1rem;border-radius:0.3rem;cursor:pointer;font-size:0.75em !important;font-family:${current.fontFamily}`;
          x.addEventListener("click", copycolour);
          x.addEventListener("mouseenter", hoverBehaviour);
          x.addEventListener("mouseleave", undoHoverBehaviour);
        });

        newElem.style.cssText =
          "width:48%;height:fit-content;margin:auto;display:flex;flex-direction:column;justify-content:space-evenly";
        //   append elements to parent
        [colorElem, backgroundColorElem, fontElem].forEach((elem) =>
          newElem.appendChild(elem)
        );
        return newElem;
      });

      let oldDiv = document.querySelector(".cssInspecter");

      oldDiv && oldDiv.remove(); // check if in dom, remove if so to prevent stacking
      let newDiv = document.createElement("div");
      newDiv.className = "cssInspecter";
      newDiv.style.cssText =
        "font-family:SegoeUI-Regular-final,Segoe UI,'Segoe UI Web (West European)',Segoe,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Tahoma,Helvetica,Arial,sans-serif !important;font-size: 0.75em !important;position:fixed;width:30%;height:60%;left:75%;top:50%;background-color:rgb(255,255,255,0.85);border:1px solid black;border-radius:1rem;display:flex;flex-direction:column;flex-wrap:wrap;padding:2rem;z-index:10000;transform:translate(-50%,-50%)";

      const mover = document.createElement("span"); // box mover
      mover.style.cssText =
        "position:absolute;transform:translate(-50%);left:50%;top:3%;;width:auto;height:1.5rem;line-height:1rem;font-size:1.75rem; border-radius:0.3rem;padding:0.1rem;border:rgb(0,0,0,0.2) solid 2px;cursor:move;user-select:none !important";
      mover.innerText = ":::::";

      const closer = document.createElement("p"); // box closer
      closer.innerText = "x";
      closer.style.cssText =
        "margin:0 !important;position:absolute;transform:translate(-50%);left:95%;top:3%;width:auto;height:1.5rem;line-height:1rem;font-size:1.5rem;padding:0.3rem;cursor:pointer;user-select:none !important";
      closer.addEventListener("click", closeExtensionWin);

      newDiv.addEventListener("mousedown", (e) => {
        newDiv.onmousemove = (e) => {
          moveWindow(e);
        };
      });
      newDiv.addEventListener("mouseup", () => {
        newDiv.onmousemove = null; // setmousemove function to null
      });

      // append additional controls to main div
      newDiv.appendChild(mover);
      newDiv.appendChild(closer);
      // append css buttons to main div
      colours.forEach((x) => newDiv.appendChild(x));
      // append main div to dom
      document.body.appendChild(newDiv);
    }
  };

  const getBody = () => {
    document.addEventListener("mousemove", detectMouse);
  };

  chrome.runtime.onMessage.addListener(() => {
    getBody();
  });
  
  getBody();
})();
