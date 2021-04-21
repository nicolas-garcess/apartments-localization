const viewController = {};

viewController.index = (req, res) => {
    const title = 'Alquila un apartamento en lugares únicos';
    res.status(200).render('index',{title:title});
}

viewController.search = (req, res) => {
    res.status(200).render('search');
}

viewController.location = (req, res) => {
    res.status(200).render('searchlocation');
}

module.exports = viewController;