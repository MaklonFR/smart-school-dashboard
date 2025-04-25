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
  const directions = ['west', 'north', 'east', 'south'];
  let currentIndex = 0;

  function setLightState(dir, color) {
      const red = document.querySelector(`#${dir} .red`);
      const yellow = document.querySelector(`#${dir} .yellow`);
      const green = document.querySelector(`#${dir} .green`);

      red.classList.remove('on');
      yellow.classList.remove('on');
      green.classList.remove('on');

      if (color === 'red') red.classList.add('on');
      else if (color === 'yellow') yellow.classList.add('on');
      else if (color === 'green') green.classList.add('on');
  }

  function setAllRedExcept(activeDir) {
      directions.forEach(dir => {
      if (dir !== activeDir) {
          setLightState(dir, 'red');
      }
      });
  }

  function runTrafficCycle() {
      const activeDir = directions[currentIndex];
      
      // 1. Hijau aktif di arah saat ini, lainnya merah
      setAllRedExcept(activeDir);
      setLightState(activeDir, 'green');

      greenTimeout = setTimeout(() => {
      setLightState(activeDir, 'yellow');

      yellowTimeout = setTimeout(() => {
          setLightState(activeDir, 'red');
          currentIndex = (currentIndex + 1) % directions.length;

          redTimeout = setTimeout(runTrafficCycle, 0); // start next cycle immediately
      }, 2000);

      }, 5000);
  }
  function traffic_stop () {
      clearTimeout(greenTimeout);
      clearTimeout(yellowTimeout);
      clearTimeout(redTimeout);
  }

 function traffic_run () {
  // Mulai siklus
  runTrafficCycle();
 }

