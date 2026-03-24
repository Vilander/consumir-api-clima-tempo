process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function formatarDataBR(dataISO) {
  const data = new Date(dataISO + "T00:00:00");
  return data.toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

async function obterClima() {
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=-22.7388&longitude=-47.3319&daily=temperature_2m_max,uv_index_max,rain_sum,apparent_temperature_max&hourly=shortwave_radiation,apparent_temperature&models=best_match&current=temperature_2m,relative_humidity_2m,is_day,rain,apparent_temperature&timezone=America%2FSao_Paulo";

  try {
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error("Erro na requisição");
    }

    const dados = await resposta.json();

    console.log("\n=== CLIMA ATUAL EM AMERICANA/SP ===");
    console.log("Temperatura:", dados.current.temperature_2m, "°C");
    console.log("Chuva:", dados.current.rain, "mm");
    console.log("Umidade:", dados.current.relative_humidity_2m, "%");
    console.log("Sensação térmica:", dados.current.apparent_temperature, "°C");
    console.log("Dia ou noite:", dados.current.is_day ? "Dia" : "Noite");

    console.log("\n=== RADIAÇÃO SOLAR (PRÓXIMAS HORAS) ===");
    if (dados.current.is_day == 1) {
      for (let i = 0; i < 3; i++) {
        console.log(
          `${dados.hourly.time[i]} → ${dados.hourly.shortwave_radiation[i]} W/m² de intensidade da radiação solar`,
        );
      }
    } else {
      console.log("Não é possível medir a radição solar durante a noite!");
    }

    console.log("\n=== PREVISÃO DIÁRIA ===");
    for (let i = 0; i < dados.daily.time.length; i++) {
      const dataFormatada = formatarDataBR(dados.daily.time[i]);
      console.log(`
     Data: ${dataFormatada}
     Chuva total: ${dados.daily.rain_sum[i]} mm
     UV máximo: ${dados.daily.uv_index_max[i]}
     ----------------------`);
    }
  } catch (erro) {
    console.error("Erro:", erro);
  }
}

obterClima();
