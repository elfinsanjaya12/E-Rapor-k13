exports.viewSetMatpel = async (req, res) => {
  try {
    const userLogin = req.session.user

    // const kelas = await Kelas.findAll()

    res.render('admin/set_mata_pelajaran/view_set_mata_pelajaran', {
      title: "E-Raport | Set Mata Pelajaran",
      user: userLogin,
      // kelas: kelas,
    })

  } catch (err) {
    throw err
  }
}
