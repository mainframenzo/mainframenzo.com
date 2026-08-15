resource "tls_private_key" "meblog_server_generic_ssh_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "hcloud_ssh_key" "meblog_server_ssh_key" {
  labels = {
    "publish-stage" = var.publish_stage
  }
  name = var.publish_stage == "prod" ? "prod-meblog-server-ssh-key" : "dev-meblog-server-ssh-key"

  public_key = tls_private_key.meblog_server_generic_ssh_key.public_key_openssh
}

resource "local_file" "meblog_server_ssh_key_pem_file" {
  content         = tls_private_key.meblog_server_generic_ssh_key.private_key_openssh
  filename        = var.publish_stage == "prod" ? "meblog-prod-server-ssh-key.pem" : "meblog-dev-server-ssh-key.pem"
  file_permission = "0600"
}
