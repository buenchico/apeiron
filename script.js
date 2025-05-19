fetch("data.json")
  .then(response => response.json()) // Parse JSON response
  .then(data => {
    const keys = Object.keys(data); // Get all keys
    const randomKey = keys[Math.floor(Math.random() * keys.length)]; // Select a random key
    const targetElement = { ...data[randomKey], symbol: randomKey }; // Append key as "symbol"
    const namesArray = Object.values(data).map(element => element["Nombre"]);
    var round = 0

    console.log(targetElement); // Now randomElement exists here

    const datalist = document.getElementById("nombres");

    namesArray.forEach(nombre => {
        const option = document.createElement("option");
        option.value = nombre;
        datalist.appendChild(option);
    });

    $("#submit").click(function() {
      var selectedElement = $('#nombre').val()
      const result = findElementByNombre(selectedElement);
      round += 1
      $('#try-' + round).html(JSON.stringify(result, null, 2))
      const test = checkElementBySymbol(result["symbol"])
      $('#try-' + round).append('<div style="margin-left: 10px">' + result[test] + '</div>')
    });

    function findElementByNombre(nombre) {
        const key = Object.keys(data).find(k => data[k]["Nombre"] === nombre);
        return key ? { ...data[key], symbol: key } : null;
    }

    function checkElementBySymbol(symbol) {
      console.log(targetElement)
      const result = data[symbol];
      console.log(result)

      return findDeepestSharedLevel(targetElement, result)
    }

    function findDeepestSharedLevel(obj1, obj2) {
      const levels = ["Nivel 4", "Nivel 3", "Nivel 2", "Nivel 1", "symbol"];
      return levels.find(level => obj1[level] === obj2[level]) || null;
    }
  })
  .catch(error => console.error("Error loading JSON:", error));
