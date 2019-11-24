exports.viewHome = async (req, res) => {
  try {
    res.render("siswa/home/view_home", {
      title: "E-Raport | Guru",
    })
  } catch (err) {
    throw err
  }
}

exports.viewNilai = async (req, res) => {
  try {
    res.render("siswa/nilai/view_nilai", {
      title: "E-Raport | Nilai",
    })
  } catch (err) {
    throw err
  }
}