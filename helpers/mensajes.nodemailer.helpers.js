const transporter = require("../middlewars/nodemailer.middlewares");

const registroExitoso = async (emailUsuario, nombreUsuario) => {
  try {
    await transporter.sendMail({
      from: `"MERCADOLIBRE_TRUCHO" <${process.env.GMAIL_APP_USER}>`,
      to: `${emailUsuario}`,
      subject: "Tu registro fue exitoso ✔",
      text: "Aprovecha las ofertas", // plain‑text body
      html: `
      <b>Bienvenido ${nombreUsuario}</b>
      <img src="https://i.pinimg.com/originals/37/1a/c8/371ac843551c2f299675c76d510eab62.gif">
      <h1>Gracias por formar parte de nuestra pagina</h1>
      
      `, // HTML body
    });
    return {
      msg: "ok",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const envioDeLaCompra = async () => {
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
    to: "bar@example.com, baz@example.com",
    subject: "Hello ✔",
    text: "Hello world?", // plain‑text body
    html: "<b>Hello world?</b>", // HTML body
  });

  console.log("Message sent:", info.messageId);
};

const recuperarContrasenia = async (token, emailUsuario) => {
  try {
    await transporter.sendMail({
      from: `"MERCADOLIBRE_TRUCHO" <${process.env.GMAIL_APP_USER}>`,
      to: `${emailUsuario}`,
      subject: "Recuperar tu contraseña ✔",
      text: "Ya falta menos que antes para que tengas tu contraseña nueva", // plain‑text body
      html: `
    <img src="https://i.gifer.com/89WP.gif">
    <b>Segui estos pasos:</b>
    <h3>Hace click en el siguiente boton</h3>
    <a href="http://localhost:5173/recoveryPassForm?token=${token}">Ir a la pagina</a>
    `, // HTML body
    });

    return {
      msg: "ok",
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500,
    };
  }
};

module.exports = {
  registroExitoso,
  envioDeLaCompra,
  recuperarContrasenia,
};
