BRANDED_APP_TITLES = {
    "ERPNext": "Magna ERP",
    "Frappe CRM": "Magna CRM",
    "Frappe HR": "Magna HR",
    "Frappe Framework": "Magna Framework",
}


def extend_bootinfo(bootinfo):
    for app in bootinfo.get("app_data", []):
        app_title = app.get("app_title")

        if branded_title := BRANDED_APP_TITLES.get(app_title):
            app["app_title"] = branded_title
