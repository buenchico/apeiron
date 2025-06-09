const today = new Date()
today.setHours(12, 0, 0, 0); // Sets time to 12:00 PM exactly

function getRandomMateriaByDate(hash, date) {
  // Convert date to a stable numeric value
  const seed = date.getTime(); // Using timestamp for consistency

  // Select a pseudo-random key
  const keys = Object.keys(hash);
  const selectedKey = keys[seed % keys.length]; // Consistent selection

  // Return the materia object with the key as `symbol`
  return { ...hash[selectedKey], symbol: selectedKey, "0": "Materia" };
}

function findDeepestSharedLevel(selected_materia, target_materia) {
  const levels = ["symbol", "4", "3", "2", "1", "0"];

  return levels.find(level => selected_materia[level] === target_materia[level]) || null;
}

fetch("data.json")
  .then(response => response.json()) // Parse JSON response
  .then(data => {
    const target_materia = getRandomMateriaByDate(data, today);

    console.log("taget materia:", target_materia); // Now includes "symbol"

    $("#target").html(JSON.stringify(target_materia))

    const level1Values = new Set();

    Object.values(data).forEach(obj => {
      if (obj["3"]) level1Values.add(obj["3"]);
    });

    console.log([...level1Values]); // Output: ["Elemento"]

    $.each(data, function(key, value) {
        $("#materia_names_data").append($("<option>").val(key).text(value["name_es"] + " (" + key + ")"));
    });

    var round = 0

    $("#submit").click(function() {
      var symbol = $('#materia_name').val()

      const selected_materia = { ...data[symbol], symbol: symbol, "0": "Materia" }

      console.log("test materia:", selected_materia);

      round += 1

      const result = findDeepestSharedLevel(selected_materia, target_materia)

      var msg_selected = "Has probado con " + selected_materia.name_es + " (" + selected_materia.symbol + ")"
      var msg_result = "Comparte con la substancia misteriosa que ambas son " + target_materia[result]

      console.log(result)

      $('#test-' + round).append('<div style="margin-left: 10px">' + msg_selected + '</div>')
      $('#test-' + round).append('<div style="margin-left: 10px">' + msg_result + '</div>')
    });

  })
  .catch(error => console.error("Error loading JSON:", error));
