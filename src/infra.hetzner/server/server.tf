resource "hcloud_server" "meblog_server" {
  labels = {
    "publish-stage" = var.publish_stage
  }
  name              = var.publish_stage == "prod" ? "prod-meblog-server" : "dev-meblog-server"
  delete_protection = false

  # Use https://radar.iodev.org/cloud-status to track what's available and where.
  server_type = "cx23" # Local llm performance is fine but hogs most of the resources, cx43 not avail here.
  image       = "ubuntu-24.04"
  location    = "nbg1" #"nbg1", "hel1", "hil", "sin"
  backups     = "false"

  firewall_ids = [
    hcloud_firewall.meblog_server_firewall.id
  ]

  ssh_keys = [
    hcloud_ssh_key.meblog_server_ssh_key.id
  ]

  user_data = templatefile("../cloud-config-template.server.yaml", {
    app_stage     = var.app_stage,
    publish_stage = var.publish_stage,
    app_location  = var.app_location,

    certbot_staging       = var.certbot_staging,
    allow_certbot_traffic = var.allow_certbot_traffic,

    meblog_release_version   = var.meblog_release_version,
    meblog_private_repo_name = var.meblog_private_repo_name,

    hetzner_api_token = var.hetzner_api_token,

    github_token = var.github_token,

    meblog_registry_directory = var.meblog_registry_directory,
    meblog_media_directory    = var.meblog_media_directory,

    restrict_to_public_ip = var.restrict_to_public_ip,

    use_prebuilt_development_container_image = var.use_prebuilt_development_container_image
  })

  lifecycle {
    ignore_changes = [ # Will not replace VM if this changes.
      user_data
    ]
  }
}
