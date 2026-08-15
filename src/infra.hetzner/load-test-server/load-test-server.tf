resource "hcloud_server" "meblog_load_test_server" {
  labels = {
    "publish-stage" = var.publish_stage
  }
  name              = var.publish_stage == "prod" ? "prod-meblog-load-test-server" : "dev-meblog-load-test-server"
  delete_protection = false

  server_type = "cx33" # FIXME Go bigger.
  image       = "ubuntu-24.04"
  location    = "hel1" #"nbg1", "hel1", "hil", "sin"
  backups     = "false"

  firewall_ids = [
    hcloud_firewall.meblog_load_test_server_firewall.id
  ]

  ssh_keys = [
    hcloud_ssh_key.meblog_load_test_server_ssh_key.id
  ]

  user_data = templatefile("../cloud-config-template.load-test-server.yaml", {
    meblog_private_repo_name = var.meblog_private_repo_name,
    #meblog_registry_directory = var.meblog_registry_directory, Not needed on VM for load test.
    #meblog_media_directory = var.meblog_media_directory, Not needed on VM for load test.
    github_token  = var.github_token
    app_stage     = var.app_stage,
    publish_stage = var.publish_stage,
    app_location  = var.app_location,
    #use_prebuilt_development_container_image = var.use_prebuilt_development_container_image, Not needed on VM for load test.
    #restrict_to_public_ip = var.restrict_to_public_ip Not needed on VM for load test.
  })

  lifecycle {
    ignore_changes = [ # Will not replace VM if this changes.
      user_data
    ]
  }
}
