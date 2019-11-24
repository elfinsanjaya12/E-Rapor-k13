exports.viewSetWaliKelas = async (req, res) => {
  try {
    const userLogin = req.session.user

    // const kelas = await Kelas.findAll()

    res.render('admin/set_wali_kelas/view_set_wali_kelas', {
      title: "E-Raport | Set Mata Pelajaran",
      user: userLogin,
      // kelas: kelas,
    })

  } catch (err) {
    throw err
  }
}
