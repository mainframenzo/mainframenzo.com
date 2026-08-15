resource "local_file" "cloud_init" {
  # multipass only looks in your home dir. Stupid.
  filename = pathexpand("~/cloud-config.yaml")

  content = templatefile("${path.module}/cloud-config-template.server.yaml", {
    meblog_private_repo_name                 = var.meblog_private_repo_name,
    meblog_registry_directory                = var.meblog_registry_directory,
    meblog_media_directory                   = var.meblog_media_directory,
    github_token                             = var.github_token,
    app_stage                                = var.app_stage,
    publish_stage                            = var.publish_stage,
    use_prebuilt_development_container_image = var.use_prebuilt_development_container_image,
    restrict_to_public_ip                    = var.restrict_to_public_ip
  })

  file_permission = "0644"
}

resource "multipass_instance" "meblog_server" {
  name = var.publish_stage == "prod" ? "prod-meblog-server" : "dev-meblog-server"

  cpus   = 2
  memory = "4G"
  disk   = "20G"
  image  = "noble" # Ubuntu 24.04.

  # This doesn't work because multipass only looks in your home dir. Stupid.
  # cloud_init_file = templatefile("cloud-config-template.server.yaml", {
  #   meblog_private_repo_name = var.meblog_private_repo_name,
  #   meblog_registry_directory = var.meblog_registry_directory,
  #   meblog_media_directory = var.meblog_media_directory,
  #   github_token = var.github_token
  #   app_stage = var.app_stage,
  #   publish_stage = var.publish_stage,
  #   use_prebuilt_development_container_image = var.use_prebuilt_development_container_image,
  #   restrict_to_public_ip = var.restrict_to_public_ip
  # })

  cloud_init_file = local_file.cloud_init.filename

  depends_on = [local_file.cloud_init]
}
