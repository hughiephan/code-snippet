terraform {
  backend "remote" {
    organization = "Massbit"

    workspaces {
      name = "massbit"
    }
  }
}

provider "google" {  
  credentials = file("token.json")
  project = "massbit-indexer"  
  region  = "europe-west3"  // Germany
  zone    = "europe-west3-a"
}


resource "google_compute_instance" "default" {
  name         = "harmony-long-test"
  machine_type = "e2-medium"
  zone         = "europe-west3-a"

  tags = ["foo", "bar"]

  boot_disk {
    initialize_params {
      image = "projects/ubuntu-os-cloud/global/images/ubuntu-2004-focal-v20210720"
      size = 200
    }
  }

  network_interface {
    network = "default"

    access_config {
      // Ephemeral public IP
    }
  }

  metadata = {
    foo = "bar"
  }

  metadata_startup_script = "echo hi > /test.txt"

  service_account {
    email = "hughie@massbit-indexer.iam.gserviceaccount.com"
    scopes = ["cloud-platform"]
  }
}
