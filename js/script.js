const data = {
    guru: 40,
    guruSertifikasi: 30,
    guruBelum: 10,
    pegawai: 12,
    totalSiswa: 500,
    siswaLaki: 280,
    siswaPerempuan: 220,
    apat: 100,
    atph: 120,
    atr: 80,
    rpl: 150,
    upw: 50,
    ruangKelas: 25,
    lab: 5,
    perpustakaan: 1,
    wc: 10,
    alumni: {
      bekerja: 150,
      lanjutStudi: 100,
      wirausaha: 50,
      belumBekerja: 70
    }
  };

  document.getElementById("jumlahGuru").textContent = data.guru;
  document.getElementById("guruSertifikasi").textContent = data.guruSertifikasi;
  document.getElementById("guruBelum").textContent = data.guruBelum;
  document.getElementById("pegawai").textContent = data.pegawai;

  document.getElementById("totalSiswa").textContent = data.totalSiswa;
  document.getElementById("siswaLaki").textContent = data.siswaLaki;
  document.getElementById("siswaPerempuan").textContent = data.siswaPerempuan;
  document.getElementById("apat").textContent = data.apat;
  document.getElementById("atph").textContent = data.atph;
  document.getElementById("atr").textContent = data.atr;
  document.getElementById("rpl").textContent = data.rpl;
  document.getElementById("upw").textContent = data.upw;

  document.getElementById("ruangKelas").textContent = data.ruangKelas;
  document.getElementById("lab").textContent = data.lab;
  document.getElementById("perpustakaan").textContent = data.perpustakaan;
  document.getElementById("wc").textContent = data.wc;

  document.getElementById("bekerja").textContent = data.alumni.bekerja;
  document.getElementById("lanjutStudi").textContent = data.alumni.lanjutStudi;
  document.getElementById("wirausaha").textContent = data.alumni.wirausaha;
  document.getElementById("belumBekerja").textContent = data.alumni.belumBekerja;

  function openTab(evt, tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    const tabButtons = document.querySelectorAll('.tab-button');
    tabContents.forEach(tab => tab.classList.remove('active'));
    tabButtons.forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
  }

  function toggleLamp(button) {
    const widget = button.closest('.lamp-widget');
    const subT = widget.querySelector('h4');
    const img = widget.querySelector('img');

    if (button.innerText === 'ON') {
      button.innerText = 'OFF';
      button.style.backgroundColor = '#b71c1c';
      widget.style.backgroundColor = '#FFF8F8';
      subT.style.color = '#111111';
      img.src = 'img/on-lamp.png';
    } else {
      button.innerText = 'ON';
      button.style.backgroundColor = '#2f80ed';
      widget.style.backgroundColor = '#1f1f1f';
      subT.style.color = '#ffffff';
      img.src = 'img/off-lamp.png';
    }
  }

  const pieOptions = {
    type: 'pie',
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: 'white'
          }
        }
      }
    }
  };

  new Chart(document.getElementById('chartGuru'), {
    ...pieOptions,
    data: {
      labels: ['Jumlah Guru', 'Sertifikasi', 'Belum Sertifikasi', 'Pegawai'],
      datasets: [{
        data: [30, 20, 10, 5],
        backgroundColor: ['#4A102A', '#E9A319', '#657C6A', '#FCEFCB']
      }]
    }
  });

  new Chart(document.getElementById('chartSiswa'), {
    ...pieOptions,
    data: {
      labels: ['Total', 'Laki-laki', 'Perempuan', 'APAT', 'ATPH', 'ATR', 'RPL', 'UPW'],
      datasets: [{
        data: [500, 250, 250, 100, 90, 80, 150, 80],
        backgroundColor: ['#5F8B4C', '#4F1C51', '#161179', '#EC5228', '#410445', '#A5158C', '#F6F8D5', '#27391C']
      }]
    }
  });

  new Chart(document.getElementById('chartFasilitas'), {
    ...pieOptions,
    data: {
      labels: ['Ruang Kelas', 'Laboratorium', 'Perpustakaan', 'WC'],
      datasets: [{
        data: [20, 5, 2, 10],
        backgroundColor: ['#A62C2C', '#123458', '#F8F5E9', '#604652']
      }]
    }
  });

  new Chart(document.getElementById('alumniChart'), {
    ...pieOptions,
    data: {
      labels: ['Bekerja', 'Lanjut Studi', 'Wirausaha', 'Belum Bekerja'],
      datasets: [{
        data: [120, 60, 40, 30],
        backgroundColor: ['#1B4D3E', '#C14600', '#7886C7', '#F8F5E9']
      }]
    }
  });

  /*Logika Lampu Lalulintas*/
  const SERVER_URL = "http://192.168.117.137"; // Sesuaikan dengan IP Pico W
  const alarmAudio = document.getElementById("alarm");
  const alarmOffBtn = document.getElementById("alarm-off-btn");
  let isAlarmPlaying = false;
  let lastTempState = null;
  let isRunning = false;
  let pollInterval = null;

  // Traffic light DOM elements
  const trafficLights = {
      "jalur1": {
          red: document.getElementById("jalur1-red"),
          yellow: document.getElementById("jalur1-yellow"),
          green: document.getElementById("jalur1-green")
      },
      "jalur2": {
          red: document.getElementById("jalur2-red"),
          yellow: document.getElementById("jalur2-yellow"),
          green: document.getElementById("jalur2-green")
      },
      "jalur3": {
          red: document.getElementById("jalur3-red"),
          yellow: document.getElementById("jalur3-yellow"),
          green: document.getElementById("jalur3-green")
      },
      "jalur4": {
          red: document.getElementById("jalur4-red"),
          yellow: document.getElementById("jalur4-yellow"),
          green: document.getElementById("jalur4-green")
      }
  };

  // Update light states in the UI
  function updateLights(states) {
      for (const jalur in states) {
          for (const color in states[jalur]) {
              const light = trafficLights[jalur][color];
              if (states[jalur][color]) {
                  light.classList.add("on");
              } else {
                  light.classList.remove("on");
              }
          }
      }
  }

  let userHasInteracted = false;

  document.addEventListener('click', () => {
    userHasInteracted = true;
  });

  // Play alarm
  function playAlarm() {
    if (!isAlarmPlaying && userHasInteracted) {
      alarmAudio.play().then(() => {
          isAlarmPlaying = true;
          alarmOffBtn.disabled = false;
          document.getElementById("status").innerHTML = "<p class='back_status'>Status: <strong style='color:#A62C2C'>WARNING! (Suhu > 30°C)</strong></p>";
          
        }).catch((error) => {
          console.error("Error playing alarm:", error);
          document.getElementById("status").textContent = "Status: Failed to play alarm";
      });
    } 
  }

  function stopAlarm() {
      alarmAudio.pause();
      alarmAudio.currentTime = 0;
      isAlarmPlaying = false;
      alarmOffBtn.disabled = true;
      document.getElementById("status").innerHTML = "<p class='back_status'>Status: <strong style='color:#3D90D7'>AMAN! (Suhu Normal)</strong></p>";
  }
  function errorConnect() {
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
    isAlarmPlaying = false;
    alarmOffBtn.disabled = true;
    document.getElementById("status").innerHTML = "<p class='back_status'>Status: <strong style='color:#A62C2C'>Error connecting to Pico W </strong></p>";
  }

  // Update sensor data in the UI
  function updateSensorData(data) {
      if (data.error) {
          sensorError.textContent = `Sensor Error: ${data.error}`;
          document.getElementById("temperature").textContent = "--";
          document.getElementById("pressure").textContent = "--";
          document.getElementById("altitude").textContent = "--";
          document.getElementById("temperature-atr").textContent = "--";
          document.getElementById("pressure-atr").textContent = "--";
          document.getElementById("altitude-atr").textContent = "--";
          errorConnect();
      } else {
          document.getElementById("temperature").textContent = data.temperature !== undefined ? data.temperature : "--";
          document.getElementById("pressure").textContent = data.pressure !== undefined ? data.pressure : "--";
          document.getElementById("altitude").textContent = data.altitude !== undefined ? data.altitude : "--";
          document.getElementById("temperature-atr").textContent = data.temperature !== undefined ? data.temperature : "--";
          document.getElementById("pressure-atr").textContent = data.pressure !== undefined ? data.pressure : "--";
          document.getElementById("altitude-atr").textContent = data.altitude !== undefined ? data.altitude : "--";

          // Alarm logic
          const temp = data.temperature;
          if (temp !== undefined && temp !== null) {
              console.log(temp);
              const isTempLow = temp > 24.3;
              console.log(temp, !isTempLow);
              if (isTempLow===false) {lastTempState="low";} else{lastTempState=null;}
              console.log('okking alarm', isTempLow);
              console.log('okking alarm-1', lastTempState);
              if (isTempLow && lastTempState !== "low") {
                console.log('Alarm triggered');
                  playAlarm();
                  lastTempState = "low";
              } else if (!isTempLow && lastTempState === "low") {
                  stopAlarm();
                  lastTempState = "normal";
              }
          }
      }
  }

  // Fetch current light states traffic and sensor data from Pico W
  async function fetchStateTraffic() {
    try {
        // Fetch traffic light states
        const stateResponse = await fetch(`${SERVER_URL}/state`, { method: "GET" });
        if (!stateResponse.ok) throw new Error("Failed to fetch state");
        const states = await stateResponse.json();
        updateLights(states);
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("status_traffic").innerHTML = "<p class='back_status'>Status: <strong style='color:#A62C2C'>Error connecting to Pico W </strong></p>";
    }
  }

  async function fetchStateSensor() {
    try {
        // Fetch sensor data
        const sensorResponse = await fetch(`${SERVER_URL}/sensor`, { method: "GET" });
        if (!sensorResponse.ok) throw new Error("Failed to fetch sensor data");
        const sensorData = await sensorResponse.json();
        updateSensorData(sensorData);
    } catch (error) {
        console.error("Error fetching data:", error);
        updateSensorData({ error: "Connection failed" });
        document.getElementById("status").innerHTML = "<p class='back_status'>Status: <strong style='color:#A62C2C'>Error connecting to Pico W </strong></p>";
    }
  }

  // Start polling for state updates
  function startPolling() {
      if (!pollInterval) {
          pollInterval = setInterval(fetchStateTraffic, 1000); // Poll every 1 second
      }
  }

  // Stop polling
  function stopPolling() {
      if (pollInterval) {
          clearInterval(pollInterval);
          pollInterval = null;
      }
  }

  // Send start command
  async function startTraffic() {
      try {
          const response = await fetch(`${SERVER_URL}/start`, { method: "POST" });
          if (!response.ok) throw new Error("Failed to start traffic");
          const data = await response.json();
          if (data.status === "started") {
              isRunning = true;
              document.getElementById("startBtn").disabled = true;
              document.getElementById("stopBtn").disabled = false;
              document.getElementById("status_traffic").innerHTML = "<p class='back_status'>Status Traffic: <strong style='color:#3D90D7'>RUNNING</strong></p>";
              startPolling();
          }
      } catch (error) {
          console.error("Error starting traffic:", error);
          document.getElementById("status_traffic").innerHTML = "<p class='back_status'>Status Traffic: <strong style='color:#A62C2C'>STOP</strong></p>";
      }
  }

  // Send stop command
  async function stopTraffic() {
      try {
          const response = await fetch(`${SERVER_URL}/stop`, { method: "POST" });
          if (!response.ok) throw new Error("Failed to stop traffic");
          const data = await response.json();
          if (data.status === "stopped") {
              isRunning = false;
              document.getElementById("startBtn").disabled = false;
              document.getElementById("stopBtn").disabled = true;
              document.getElementById("status_traffic").textContent = "Status Traffic: Stopped";
              stopPolling();
              fetchStateTraffic(); // Update lights to show all red
          }
      } catch (error) {
          console.error("Error stopping traffic:", error);
          document.getElementById("status_traffic").textContent = "Status Traffic: Error stopping traffic";
      }
  }

  // Button event listeners
  document.getElementById("startBtn").addEventListener("click", startTraffic);
  document.getElementById("stopBtn").addEventListener("click", stopTraffic);

   // Initial state fetch
  // Call fetchState when document is fully loaded and start polling

  document.addEventListener("DOMContentLoaded", function(event) {
    startPolling();
    setInterval(fetchStateSensor, 1000);
  });
