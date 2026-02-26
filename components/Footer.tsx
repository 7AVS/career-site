import { Github, Linkedin, Mail } from "lucide-react";
import { careerData } from "@/lib/career-data";

export function Footer() {
  const { profile, footerTagline } = careerData;

  return (
    <footer className="border-t border-[#2a2a2a] mt-24">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground">
              {profile.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {profile.title} · {profile.subtitle.split(",")[0]}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {profile.links.github && (
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {profile.links.linkedin && (
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {profile.links.email && (
              <a
                href={`mailto:${profile.links.email}`}
                className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#2a2a2a] text-center">
          <p className="text-sm text-muted-foreground">{footerTagline}</p>
        </div>
      </div>
    </footer>
  );
}
